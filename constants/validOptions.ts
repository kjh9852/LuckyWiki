export const VALID_OPTIONS = {
  passwordPattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: '영문, 숫자를 포함하여 8자 이상으로 작성해주세요',
  },
  emailPattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: '이메일 형식으로 작성해주세요',
  },
  minLength2: { value: 2, message: '2자 이상으로 작성해주세요.' },
  maxLength10: { value: 10, message: '10자 이내로 작성해주세요.' },
};
