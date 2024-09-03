import { useForm, UseFormRegisterReturn } from 'react-hook-form';

export interface FormInputValues {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  currentPassword?: string;
}

type FormField = keyof FormInputValues;

// argument로 들어온 배열에 속하는 요소만 유효성 검사 로직에 등록됩니다.
export const useValidForm = (fieldList: FormField[]) => {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputValues>({ mode: 'onChange' });

  // field값을 받아서 해당 field값 맞는 register를 생성하는 함수
  const getRegisterOption = (field: FormField) => {
    switch (field) {
      case 'name':
        return register('name', {
          required: true,
          minLength: { value: 2, message: '2자 이상으로 작성해주세요.' },
          maxLength: { value: 10, message: '10자 이내로 작성해주세요.' },
        });
      case 'email':
        return register('email', {
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '이메일 형식으로 작성해주세요',
          },
        });
      case 'password':
        return register('password', {
          required: true,
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: '영문, 숫자를 포함하여 8자 이상으로 작성해주세요',
          },
          onChange: () => trigger('passwordConfirmation'), //password를 입력할 때마다 passwordConfirmation의 유효성 검사도 함께 트리거 되도록 함
        });
      case 'currentPassword':
        return register('currentPassword', {
          required: true,
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: '영문, 숫자를 포함하여 8자 이상으로 작성해주세요',
          },
        });
      case 'passwordConfirmation':
        return register('passwordConfirmation', {
          required: true,
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: '영문, 숫자를 포함하여 8자 이상으로 작성해주세요',
          },
          validate: {
            matched: (value, formValues) => value === formValues.password || '비밀번호가 일치하지 않습니다.',
          },
        });
      default: // 지정된 케이스가 없다면 undefined를 반환하여 커스텀 훅의 register 반환값에 추가되지 않도록 함
        return undefined;
    }
  };

  // 선택된 필드들만 register로 등록되고, 반환 객체에 추가
  const selectedRegisters = fieldList.reduce(
    (acc, fieldName) => {
      const registerOption = getRegisterOption(fieldName);

      if (registerOption) {
        // registerOption이 반환값이 있을 경우에만 반환 객체에 추가
        acc[fieldName] = registerOption;
      }

      return acc;
    },
    {} as Record<FormField, UseFormRegisterReturn>,
  );

  return {
    handleSubmit,
    register: selectedRegisters,
    errors,
  };
};
