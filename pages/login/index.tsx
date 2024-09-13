import Link from 'next/link';
import React from 'react';
import { useValidForm, ValidationConfig } from '@/hooks/useValidForm';
import ValidInput from '@/components/@shared/Input/ValidInput';
import { useAuth } from '@/contexts/AuthProvider';
import { FieldValues } from 'react-hook-form';
import { VALID_OPTIONS } from '@/constants/validOptions';

const loginValidationConfig: ValidationConfig = {
  email: {
    required: 'e-mail을 입력해주세요',
    pattern: VALID_OPTIONS.emailPattern,
  },
  password: {
    required: '비밀번호를 입력해주세요',
    pattern: VALID_OPTIONS.passwordPattern,
  },
};

export default function LogInPage() {
  const { logIn } = useAuth();

  const { register, errors, handleSubmit } = useValidForm({ validationConfig: loginValidationConfig });

  const handleFormSubmit = async (formData: FieldValues) => {
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
          placeholder={'이메일을 입력해주세요'}
        />

        <ValidInput
          label={'비밀번호'}
          type={'password'}
          htmlFor={'password'}
          error={errors.password}
          message={errors.password?.message}
          register={register.password}
          placeholder={'비밀번호를 입력해주세요'}
        />

        <button className={'button'}>로그인</button>

        <Link className={'text-xs'} href={'/signup'}>
          회원가입
        </Link>
      </form>
    </main>
  );
}
