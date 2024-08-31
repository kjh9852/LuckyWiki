import { useForm } from 'react-hook-form';

export interface FormInputValues {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
}

export const useValidForm = () => {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputValues>({ mode: 'onChange' });

  const nameRegister = register('name', {
    required: true,
    minLength: { value: 2, message: '2자 이상으로 작성해주세요.' },
    maxLength: { value: 10, message: '10자 이내로 작성해주세요.' },
  });

  const emailRegister = register('email', {
    required: true,
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '이메일 형식으로 작성해주세요',
    },
  });

  const passwordRegister = register('password', {
    required: true,
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: '영문, 숫자를 포함하여 8자 이상으로 작성해주세요',
    },
    onChange: () => trigger('verifyPassword'),
  });

  const verifyPasswordRegister = register('verifyPassword', {
    required: '비밀번호가 일치하지 않습니다.',
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: '영문, 숫자를 포함하여 8자 이상으로 작성해주세요',
    },
    validate: {
      matched: (value, formValues) => value === formValues.password || '비밀번호가 일치하지 않습니다.',
    },
  });

  return {
    handleSubmit,
    register: {
      name: nameRegister,
      email: emailRegister,
      password: passwordRegister,
      verifyPassword: verifyPasswordRegister,
    },
    errors,
  };
};
