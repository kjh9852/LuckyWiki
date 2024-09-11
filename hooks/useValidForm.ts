import { Mode, RegisterOptions, useForm, UseFormRegisterReturn } from 'react-hook-form';

export type ValidationConfig = Record<string, RegisterOptions>;

export const useValidForm = ({
  validationConfig,
  mode = 'onChange',
}: {
  validationConfig: ValidationConfig;
  mode?: Mode;
}) => {
  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode });

  // 받은 config에 맞게 register를 생성하는 함수
  const getRegisterOption = (fieldName: string, validationRule: RegisterOptions) => {
    return register(fieldName, {
      ...validationRule,
      onChange: event => {
        const { value } = event.target;
        if (fieldName === 'password' && Object.hasOwn(validationConfig, 'passwordConfirmation')) {
          // 비밀번호의 경우, 비밀번호 확인이 인자로 받은 formConfig에 존재한다면
          // 비밀번호 입력에 따라 비밀번호 확인 유효성 검사도 함께 작동하도록 구현
          trigger('passwordConfirmation');
        }
        // 첫 문자로 공백이 오는 것을 방지
        setValue(fieldName, value === ' ' ? value.trim() : value);
      },
    });
  };

  // 선택된 필드들만 register로 등록되고, 반환 객체에 추가
  const createdRegisterObject = Object.entries(validationConfig).reduce(
    (acc, [fieldName, validationRule]) => {
      acc[fieldName] = getRegisterOption(fieldName, validationRule);

      return acc;
    },
    {} as Record<string, UseFormRegisterReturn>,
  );

  return {
    handleSubmit,
    register: createdRegisterObject,
    errors,
    setValue,
  };
};
