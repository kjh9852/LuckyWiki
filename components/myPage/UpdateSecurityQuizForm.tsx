import { FormInputValues, useValidForm } from '@/hooks/useValidForm';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames';
import { SubmitHandler } from 'react-hook-form';
import ValidInput from '../@shared/Input/ValidInput';
import { updateSecurityQuiz } from '@/apis/auth/updateSecurityQuiz';
import { useSnackBar } from '@/contexts/SnackbarProvider';
import { fetchWithTokenRefresh } from '@/apis/auth/fetchWithTokenRefresh';
import { useAuth } from '@/contexts/AuthProvider';

interface UpdateSecurityQuizFormProps {
  code: string;
  currentSecurityQuestion: string;
}

export default function UpdateSecurityQuizForm({ code, currentSecurityQuestion }: UpdateSecurityQuizFormProps) {
  const { syncUserAuthState } = useAuth();
  const { openSnackBar } = useSnackBar();
  const { register, errors, handleSubmit, setValue } = useValidForm([
    'currentSecurityAnswer',
    'securityAnswer',
    'securityQuestion',
  ]);

  const handleFormSubmit: SubmitHandler<FormInputValues> = async formData => {
    if (formData.securityAnswer && formData.securityQuestion) {
      const { currentSecurityAnswer, securityAnswer, securityQuestion } = formData;
      // 수정할 수 있게 핑을 열어둠
      const ping = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles/${code}/ping`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ securityAnswer: currentSecurityAnswer }),
      });

      if (ping) {
        const response = await updateSecurityQuiz({
          code,
          securityQuestion,
          securityAnswer,
        });

        if (response) {
          openSnackBar({ type: 'success', content: '인증 퀴즈가 변경되었습니다.' });
          setValue('currentSecurityAnswer', '');
          setValue('securityAnswer', '');
          setValue('securityQuestion', '');
          syncUserAuthState();
        } else {
          openSnackBar({ type: 'error', content: '인증 퀴즈 변경에 실패하였습니다.' });
        }
      } else {
        openSnackBar({ type: 'error', content: '보안 답변을 다시 확인해주세요' });
      }
    }
  };

  return (
    <form className={classNames('form', styles.myPageForm)} onSubmit={handleSubmit(handleFormSubmit)}>
      <h4 className={'text-md'}>인증 퀴즈 변경하기</h4>

      <div className={'input'}>{currentSecurityQuestion}</div>

      <ValidInput
        error={errors.currentSecurityAnswer}
        message={errors.currentSecurityAnswer?.message}
        register={register.currentSecurityAnswer}
        placeholder={'기존 답변을 입력해주세요'}
      />
      <ValidInput
        error={errors.securityQuestion}
        message={errors.securityQuestion?.message}
        register={register.securityQuestion}
        placeholder={'새로운 질문을 입력해주세요'}
      />
      <ValidInput
        error={errors.securityAnswer}
        message={errors.securityAnswer?.message}
        register={register.securityAnswer}
        placeholder={'새로운 답변을 입력해주세요'}
      />

      <div className={styles.buttonWrapper}>
        <button className={'button'}>변경하기</button>
      </div>
    </form>
  );
}
