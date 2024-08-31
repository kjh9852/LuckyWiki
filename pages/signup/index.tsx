import classNames from 'classnames';
import styles from './signup.module.scss';
import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import React from 'react';
import { useValidForm } from '@/hooks/useValidForm';

interface FormInputValues {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
}

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
        <div className={styles.inputWrapper}>
          <label htmlFor={'name'} className={'text-md'}>
            이름
          </label>
          <input
            id={'name'}
            className={classNames('input', errors.name && styles.error)}
            placeholder={'이름을 입력해 주세요'}
            {...register.name}
          />
          {errors.name && <p className={classNames('text-xs', styles.message)}>{errors.name.message}</p>}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor={'email'} className={'text-md'}>
            이메일
          </label>
          <input
            id={'email'}
            type={'email'}
            className={classNames('input', errors.email && styles.error)}
            placeholder={'이메일을 입력해 주세요'}
            {...register.email}
          />
          {errors.email && <p className={classNames('text-xs', styles.message)}>{errors.email.message}</p>}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor={'password'} className={'text-md'}>
            비밀번호
          </label>
          <input
            id={'password'}
            className={classNames('input', errors.password && styles.error)}
            placeholder={'비밀번호를 입력해 주세요'}
            {...register.password}
          />
          {errors.password && <p className={classNames('text-xs', styles.message)}>{errors.password.message}</p>}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor={'verifyPassword'} className={'text-md'}>
            비밀번호 확인
          </label>
          <input
            id={'verifyPassword'}
            className={classNames('input', errors.verifyPassword && styles.error)}
            placeholder={'비밀번호를 입력해 주세요'}
            {...register.verifyPassword}
          />
          {errors.verifyPassword && (
            <p className={classNames('text-xs', styles.message)}>{errors.verifyPassword.message}</p>
          )}
        </div>

        <button className={'button'}>가입하기</button>

        <p className={'text-xs'}>
          이미 회원이신 가요?<Link href={'login'}>로그인하기</Link>
        </p>
      </form>
    </main>
  );
}
