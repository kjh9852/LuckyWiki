import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import React from 'react';
import { FormInputValues, useValidForm } from '@/hooks/useValidForm';
import ValidInput from '@/components/@shared/ValidInput';
import { authenticateLogIn } from '@/apis/auth/authenticateLogIn';

export default function LogInPage() {
  const { register, errors, handleSubmit } = useValidForm(['email', 'password']);

  const handleFormSubmit: SubmitHandler<FormInputValues> = async formData => {
    if (formData.email && formData.password) {
      const response = await authenticateLogIn({ email: formData.email, password: formData.password });
      console.log(response);
    }
  };

  return (
    <main className={'auth-container'}>
      <h3 className={'text-2xl'}>로그인</h3>

      <form className={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
        <ValidInput
          label={'이메일'}
          htmlFor={'email'}
          error={errors.email}
          message={errors.email?.message}
          register={register.email}
        />

        <ValidInput
          label={'비밀번호'}
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
