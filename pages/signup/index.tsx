import classNames from 'classnames';
import styles from './signup.module.scss';
import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import React from 'react';
import { FormInputValues, useValidForm } from '@/hooks/useValidForm';
import ValidInput from '@/components/@shared/ValidInput';

export default function SignupPage() {
  const { register, errors, handleSubmit } = useValidForm();

  const handleFormSubmit: SubmitHandler<FormInputValues> = data => {
    // await fetch 회원가입
    console.log(data);
  };

  return (
    <main className={styles.container}>
      <h3 className={classNames('text-2xl')}>회원가입</h3>

      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
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

        <ValidInput
          label={'비밀번호 확인'}
          htmlFor={'verifyPassword'}
          error={errors.verifyPassword}
          message={errors.verifyPassword?.message}
          register={register.verifyPassword}
        />

        <button className={'button'}>가입하기</button>

        <p className={'text-xs'}>
          이미 회원이신 가요?<Link href={'login'}>로그인하기</Link>
        </p>
      </form>
    </main>
  );
}
