import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import React from 'react';
import { FormInputValues, useValidForm } from '@/hooks/useValidForm';
import ValidInput from '@/components/@shared/ValidInput';
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';

export default function SignUpPage() {
  const { isLoggedIn, signUp } = useAuth();
  const router = useRouter();
  if (isLoggedIn) {
    router.push('/');
  }
  const { register, errors, handleSubmit } = useValidForm(['email', 'name', 'password', 'verifyPassword']);

  const handleFormSubmit: SubmitHandler<FormInputValues> = async formData => {
    if (formData.email && formData.name && formData.password && formData.verifyPassword) {
      const { email, name, password, verifyPassword } = formData;
      await signUp({ email, name, password, verifyPassword });
    }
  };

  return (
    <main className={'auth-container'}>
      <h3 className={'text-2xl'}>회원가입</h3>

      <form className={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
        <ValidInput
          label={'이름'}
          htmlFor={'name'}
          error={errors.name}
          message={errors.name?.message}
          register={register.name}
        />

        <ValidInput
          label={'이메일'}
          htmlFor={'email'}
          type={'email'}
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

        <ValidInput
          label={'비밀번호 확인'}
          type={'password'}
          htmlFor={'verifyPassword'}
          error={errors.verifyPassword}
          message={errors.verifyPassword?.message}
          register={register.verifyPassword}
        />

        <button className={'button'}>가입하기</button>

        <div className={'text-xs'}>
          <span>이미 회원이신 가요?</span>
          <Link href={'/login'}>로그인하기</Link>
        </div>
      </form>
    </main>
  );
}
