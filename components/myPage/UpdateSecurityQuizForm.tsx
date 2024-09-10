import { FormInputValues, useValidForm } from '@/hooks/useValidForm';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames';
import { SubmitHandler } from 'react-hook-form';
import ValidInput from '../@shared/Input/ValidInput';
import { updateSecurityQuiz } from '@/apis/auth/updateSecurityQuiz';
import { useSnackBar } from '@/contexts/SnackbarProvider';
import { fetchWithTokenRefresh } from '@/apis/auth/fetchWithTokenRefresh';
import { useAuth } from '@/contexts/AuthProvider';
import { ChangeEvent, useState } from 'react';
import { sendMail } from '@/utils/sendMail';
interface UpdateSecurityQuizFormProps {
  code: string;
  currentSecurityQuestion: string;
}

export default function UpdateSecurityQuizForm({ code, currentSecurityQuestion }: UpdateSecurityQuizFormProps) {
  const { syncUserAuthState, user } = useAuth();
  const { openSnackBar } = useSnackBar();
  const { register, errors, handleSubmit, setValue } = useValidForm([
    'currentSecurityAnswer',
    'securityAnswer',
    'securityQuestion',
  ]);

  const handleFormSubmit: SubmitHandler<FormInputValues> = async (formData, event) => {
    if (formData.securityAnswer && formData.securityQuestion && event && user) {
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
          const emailInput = event.target['email'];
          if (emailInput.value) {
            sendMail({ answer: securityAnswer, question: securityQuestion, name: user.name, email: emailInput.value });
            // submit 시에만 필요한 input이기 때문에 불필요한 리렌더링 제거를 위해 따로 onChange 함수로 value를 관리하지 않기 때문
            emailInput.value = '';
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

      <label className={'text-md'}>질문과 답변을 이메일로 받기</label>
      <input className={'input'} type="email" name={'email'} placeholder={'비워두면 이메일은 가지 않아요..'} />

      <div className={styles.buttonWrapper}>
        <button className={'button'}>변경하기</button>
      </div>
    </form>
  );
}
