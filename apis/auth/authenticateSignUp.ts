interface AuthenticateSignUpProps {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface AuthenticateSignUpReturn {
  user: {
    id: number;
    name: string;
    teamId: '8-7';
    createdAt: string;
    updatedAt: string;
    profile: null;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const authenticateSignUp = async ({
  email,
  name,
  password,
  passwordConfirmation,
}: AuthenticateSignUpProps): Promise<AuthenticateSignUpReturn | undefined> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signUp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, password, passwordConfirmation }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || '예기치 않은 오류가 발생했습니다.');
  }

  return result;
};
