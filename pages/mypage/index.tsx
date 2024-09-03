import ValidInput from '@/components/@shared/ValidInput';
import { useAuth } from '@/contexts/AuthProvider';
import { FormInputValues, useValidForm } from '@/hooks/useValidForm';

import { SubmitHandler } from 'react-hook-form';

export default function MyPage() {
  const { isLoggedIn } = useAuth();

  const { register, errors, handleSubmit } = useValidForm(['previousPassword', 'password', 'verifyPassword']);

  const handleFormSubmit: SubmitHandler<FormInputValues> = async formData => {
    if (formData.previousPassword && formData.password && formData.verifyPassword) {
      const { email, password, verifyPassword } = formData;
    }
  };

  return (
    <main className={'auth-container'}>
      <h3 className={'text-2xl'}>계정 설정</h3>

      <form className={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
        <ValidInput
          type={'previousPassword'}
          htmlFor={'previousPassword'}
          error={errors.email}
          message={errors.email?.message}
          register={register.email}
        />

        <ValidInput
          type={'password'}
          htmlFor={'password'}
          error={errors.password}
          message={errors.password?.message}
          register={register.password}
        />

        <ValidInput
          type={'verifyPassword'}
          htmlFor={'verifyPassword'}
          error={errors.password}
          message={errors.password?.message}
          register={register.password}
        />

        <button className={'button'}>변경하기</button>
      </form>
    </main>
  );
}
