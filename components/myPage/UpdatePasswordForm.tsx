import { useValidForm, ValidationConfig } from '@/hooks/useValidForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import ValidInput from '../@shared/inputHeader/ValidInput';
import { useRouter } from 'next/router';
import { updatePassword } from '@/apis/auth/updatePassword';
import { useSnackBar } from '@/contexts/SnackbarProvider';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames';
import { VALID_OPTIONS } from '@/constants/validOptions';

const updatePasswordFormConfig: ValidationConfig = {
  currentPassword: {
    required: '현재 비밀번호를 입력해주세요',
    pattern: VALID_OPTIONS.passwordPattern,
  },
  password: {
    required: '새로운 비밀번호를 입력해주세요',
    pattern: VALID_OPTIONS.passwordPattern,
  },
  passwordConfirmation: {
    required: '비밀번호를 한 번 더 입력해주세요',
    pattern: VALID_OPTIONS.passwordPattern,
    validate: {
      matched: (value, formValues) => value === formValues.password || '비밀번호가 일치하지 않습니다.',
    },
  },
};

export default function UpdatePasswordForm() {
  const { openSnackBar } = useSnackBar();
  const router = useRouter();

  const { register, errors, handleSubmit } = useValidForm({ validationConfig: updatePasswordFormConfig });

  const handleFormSubmit: SubmitHandler<FieldValues> = async formData => {
    if (formData.currentPassword && formData.password && formData.passwordConfirmation) {
      const { currentPassword, password, passwordConfirmation } = formData;
      const response = await updatePassword({ currentPassword, password, passwordConfirmation });

      if (!response) {
        openSnackBar({ type: 'error', content: '기존 비밀 번호를 다시 확인해주세요' });
      } else {
        router.push('/home');
      }
    }
  };

  return (
    <form className={classNames('form', styles.myPageForm)} onSubmit={handleSubmit(handleFormSubmit)}>
      <h4 className={'text-md'}>비밀번호 변경</h4>
      <ValidInput
        type={'password'}
        htmlFor={'currentPassword'}
        error={errors.currentPassword}
        message={errors.currentPassword?.message}
        register={register.currentPassword}
        placeholder={'기존 비밀번호를 입력해주세요'}
      />

      <ValidInput
        type={'password'}
        htmlFor={'password'}
        error={errors.password}
        message={errors.password?.message}
        register={register.password}
        placeholder={'비밀번호를 입력해주세요'}
      />

      <ValidInput
        type={'password'}
        htmlFor={'passwordConfirmation'}
        error={errors.passwordConfirmation}
        message={errors.passwordConfirmation?.message}
        register={register.passwordConfirmation}
        placeholder={'비밀번호를 한 번 더 입력해주세요'}
      />

      <div className={styles.buttonWrapper}>
        <button className={'button'}>변경하기</button>
      </div>
    </form>
  );
}
