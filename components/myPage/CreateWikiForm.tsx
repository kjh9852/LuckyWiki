import { FormInputValues, useValidForm } from '@/hooks/useValidForm';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames';
import { SubmitHandler } from 'react-hook-form';
import ValidInput from '../@shared/Input/ValidInput';
import { createProfile } from '@/apis/auth/createProfile';
import { useSnackBar } from '@/contexts/SnackbarProvider';
import { useAuth } from '@/contexts/AuthProvider';

// TODO: 위키 생성 폼이랑 위키 질문 변경 폼을 따로 만들어야 함

export default function CreateWikiForm() {
  const { syncUserAuthState } = useAuth();
  const { openSnackBar } = useSnackBar();
  const { register, errors, handleSubmit } = useValidForm(['securityAnswer', 'securityQuestion']);

  const handleFormSubmit: SubmitHandler<FormInputValues> = async formData => {
    if (formData.securityAnswer && formData.securityQuestion) {
      const { securityAnswer, securityQuestion } = formData;
      const response = await createProfile({ securityAnswer, securityQuestion });

      if (response) {
        openSnackBar({ type: 'success', content: '위키 생성이 완료되었습니다.' });
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

      <div className={styles.buttonWrapper}>
        <button className={'button'}>생성하기</button>
      </div>
    </form>
  );
}
