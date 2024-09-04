import { authenticateLogIn } from '@/apis/auth/authenticateLogIn';
import { authenticateSignUp } from '@/apis/auth/authenticateSignUp';
import { getUser } from '@/apis/auth/getUser';
import { FormInputValues } from '@/hooks/useValidForm';
import { getTokens } from '@/utils/getTokens';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface Profile {
  code: string;
  id: number;
  image?: string | null;
}

interface AuthResponse {
  user: {
    id: number;
    name: string;
    profile: Profile | null;
  };
  accessToken: string;
  refreshToken: string;
}

interface User {
  profile: Profile | null;
  name: string;
  id: number;
}

type signUpParams = Record<keyof FormInputValues, string>;
type logInParams = Record<keyof Pick<FormInputValues, 'email' | 'password'>, string>;

interface AuthContextValue {
  isLoggedIn: boolean;
  user: User | null;
  signUp: (formData: signUpParams) => Promise<void>;
  logIn: (formData: logInParams) => Promise<void>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const initAuthenticatedUser = (response: AuthResponse) => {
    const { id, name, profile } = response.user;
    setCookie('accessToken', response.accessToken);
    setCookie('refreshToken', response.refreshToken);
    setIsLoggedIn(true);
    setUser({
      id,
      name,
      profile,
    });
    router.push('/');
  };

  const signUp = async ({ email, name, password, verifyPassword }: signUpParams) => {
    const response = await authenticateSignUp({
      email,
      name,
      password,
      passwordConfirmation: verifyPassword,
    });

    if (response) {
      initAuthenticatedUser(response);
    }
  };

  const logIn = async ({ email, password }: logInParams) => {
    const response = await authenticateLogIn({ email, password });

    if (response) {
      initAuthenticatedUser(response);
    }
  };

  const logOut = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
    router.push('/');
  };

  const initUser = async () => {
    const userInfoResponse = await getUser();
    if (userInfoResponse) {
      const { id, name, profile } = userInfoResponse;
      setUser({ id, name, profile });
    }
  };

  const authContextValue = {
    isLoggedIn,
    user,
    signUp,
    logIn,
    logOut,
  };

  useEffect(() => {
    const { accessToken } = getTokens();
    if (accessToken) {
      initUser();
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  return context;
};
