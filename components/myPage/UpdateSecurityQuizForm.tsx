import { useValidForm, ValidationConfig } from '@/hooks/useValidForm';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import ValidInput from '../@shared/Input/ValidInput';
import { updateSecurityQuiz } from '@/apis/auth/updateSecurityQuiz';
import { useSnackBar } from '@/contexts/SnackbarProvider';
import { fetchWithTokenRefresh } from '@/apis/auth/fetchWithTokenRefresh';
import { useAuth } from '@/contexts/AuthProvider';
import { sendMail } from '@/utils/sendMail';
import { VALID_OPTIONS } from '@/constants/validOptions';
interface UpdateSecurityQuizFormProps {
  code: string;
  currentSecurityQuestion: string;
}

const updateSecurityQuizFormConfig: ValidationConfig = {
  currentSecurityAnswer: {
    required: '기존 질문에 대한 답변을 입력해주세요',
    minLength: VALID_OPTIONS.minLength2,
    maxLength: VALID_OPTIONS.maxLength10,
  },
  securityAnswer: {
    required: '새로운 질문을 입력해주세요',
    minLength: VALID_OPTIONS.minLength2,
    maxLength: VALID_OPTIONS.maxLength10,
  },
  securityQuestion: {
    required: '새로운 답변을 입력해주세요',
    minLength: VALID_OPTIONS.minLength2,
    maxLength: VALID_OPTIONS.maxLength10,
  },
  toEmail: {
    required: false,
    pattern: VALID_OPTIONS.emailPattern,
  },
};

export default function UpdateSecurityQuizForm({ code, currentSecurityQuestion }: UpdateSecurityQuizFormProps) {
  const { syncUserAuthState, user } = useAuth();
  const { openSnackBar } = useSnackBar();
  const { register, errors, handleSubmit, setValue } = useValidForm({ validationConfig: updateSecurityQuizFormConfig });

  const handleFormSubmit: SubmitHandler<FieldValues> = async formData => {
    if (formData.securityAnswer && formData.securityQuestion && user) {
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
          if (formData.toEmail) {
            sendMail({
              answer: securityAnswer,
              question: securityQuestion,
              name: user.name,
              email: formData.toEmail,
            });
            setValue('toEmail', '');
          }

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
      <ValidInput
        label={'이메일을 입력하면 인증 퀴즈 내용을 보내드려요'}
        type="email"
        placeholder={'비워두면 이메일은 가지 않아요..'}
        error={errors.toEmail}
        message={errors.toEmail?.message}
        register={register.toEmail}
      />
      <div className={styles.buttonWrapper}>
        <button className={'button'}>변경하기</button>
      </div>
    </form>
  );
}
