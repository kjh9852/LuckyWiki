import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import React from 'react';
import { FormInputValues, useValidForm } from '@/hooks/useValidForm';
import ValidInput from '@/components/@shared/ValidInput';
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';

export default function LogInPage() {
  const { isLoggedIn, logIn } = useAuth();
  const router = useRouter();
  if (isLoggedIn) {
    router.push('/');
  }
  const { register, errors, handleSubmit } = useValidForm(['email', 'password']);

  const handleFormSubmit: SubmitHandler<FormInputValues> = async formData => {
    if (formData.email && formData.password) {
      const { email, password } = formData;
      await logIn({ email, password });
    }
  };

  return (
    <main className={'auth-container'}>
      <h3 className={'text-2xl'}>로그인</h3>

      <form className={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
        <ValidInput
          label={'이메일'}
          type={'email'}
          htmlFor={'email'}
          error={errors.email}
          message={errors.email?.message}
          register={register.email}
        />

        <ValidInput
          label={'비밀번호'}
          type={'password'}
          htmlFor={'password'}
          error={errors.password}
          message={errors.password?.message}
          register={register.password}
        />

        <button className={'button'}>로그인</button>

        <Link className={'text-xs'} href={'/signup'}>
          회원가입
        </Link>
      </form>
    </main>
  );
}
