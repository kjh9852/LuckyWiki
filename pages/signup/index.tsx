import Link from 'next/link';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import React from 'react';
import ValidInput from '@/components/@shared/Input/ValidInput';
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';
import { useValidForm, ValidationConfig } from '@/hooks/useValidForm';
import { VALID_OPTIONS } from '@/constants/validOptions';

const signUpValidationConfig: ValidationConfig = {
  name: {
    required: '이름을 입력해주세요',
    minLength: VALID_OPTIONS.minLength2,
    maxLength: VALID_OPTIONS.maxLength10,
  },
  email: {
    required: 'e-mail을 입력해주세요',
    pattern: VALID_OPTIONS.emailPattern,
  },
  password: {
    required: '비밀번호를 입력해주세요',
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

export default function SignUpPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  const { register, errors, handleSubmit } = useValidForm({ validationConfig: signUpValidationConfig });

  const handleFormSubmit: SubmitHandler<FieldValues> = async formData => {
    if (formData.email && formData.name && formData.password && formData.passwordConfirmation) {
      const { email, name, password, passwordConfirmation } = formData;
      await signUp({ email, name, password, passwordConfirmation });
      router.push('/home');
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
          placeholder={'이름을 입력해주세요'}
        />

        <ValidInput
          label={'이메일'}
          htmlFor={'email'}
          type={'email'}
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

        <ValidInput
          label={'비밀번호 확인'}
          type={'password'}
          htmlFor={'passwordConfirmation'}
          error={errors.passwordConfirmation}
          message={errors.passwordConfirmation?.message}
          register={register.passwordConfirmation}
          placeholder={'비밀번호를 한 번 더 입력해주세요'}
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
