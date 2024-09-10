import { FormInputValues, useValidForm } from '@/hooks/useValidForm';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames';
import { SubmitHandler } from 'react-hook-form';
import ValidInput from '../@shared/Input/ValidInput';
import { createProfile } from '@/apis/auth/createProfile';
import { useSnackBar } from '@/contexts/SnackbarProvider';
import { useAuth } from '@/contexts/AuthProvider';
import { useState } from 'react';
import { sendMail } from '@/utils/sendMail';

// TODO: 위키 생성 폼이랑 위키 질문 변경 폼을 따로 만들어야 함

export default function CreateWikiForm() {
  const { syncUserAuthState, user } = useAuth();
  const { openSnackBar } = useSnackBar();
  const { register, errors, handleSubmit } = useValidForm(['securityAnswer', 'securityQuestion']);

  const handleFormSubmit: SubmitHandler<FormInputValues> = async (formData, event) => {
    if (formData.securityAnswer && formData.securityQuestion && event && user) {
      const { securityAnswer, securityQuestion } = formData;
      const response = await createProfile({ securityAnswer, securityQuestion });

      if (response) {
        openSnackBar({ type: 'success', content: '위키 생성이 완료되었습니다.' });
        const emailInput = event.target['email'];
        if (emailInput.value) {
          sendMail({ answer: securityAnswer, question: securityQuestion, name: user.name, email: emailInput.value });
          // submit 시에만 필요한 input이기 때문에 불필요한 리렌더링 제거를 위해 따로 onChange 함수로 value를 관리하지 않기 때문
          emailInput.value = '';
        }
        syncUserAuthState();
      } else {
        openSnackBar({ type: 'error', content: '위키 생성에 실패하였습니다.' });
      }
    }
  };

  return (
    <form className={classNames('form', styles.myPageForm)} onSubmit={handleSubmit(handleFormSubmit)}>
      <h4 className={'text-md'}>나의 위키 편집 권한을 위한 퀴즈</h4>

      <ValidInput
        error={errors.securityQuestion}
        message={errors.securityQuestion?.message}
        register={register.securityQuestion}
        placeholder={'질문을 입력해주세요'}
      />
      <ValidInput
        error={errors.securityAnswer}
        message={errors.securityAnswer?.message}
        register={register.securityAnswer}
        placeholder={'답변을 입력해주세요'}
      />

      <label className={'text-md'}>질문과 답변을 이메일로 받기</label>
      <input className={'input'} type="email" name={'email'} placeholder={'비워두면 이메일은 가지 않아요..'} />

      <div className={styles.buttonWrapper}>
        <button className={'button'}>생성하기</button>
      </div>
    </form>
  );
}
