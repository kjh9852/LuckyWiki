import { authenticateLogIn } from '@/apis/auth/authenticateLogin';
import { authenticateSignUp } from '@/apis/auth/authenticateSignUp';
import { getUser } from '@/apis/auth/getUser';
import { FormInputValues } from '@/hooks/useValidForm';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSnackBar } from './SnackbarProvider';
import { UserProfile } from '@/types/types';

interface User {
  profile: UserProfile | null;
  name: string;
  id: number;
}

type signUpParams = Record<keyof Pick<FormInputValues, 'email' | 'name' | 'password' | 'passwordConfirmation'>, string>;
type logInParams = Record<keyof Pick<FormInputValues, 'email' | 'password'>, string>;

interface AuthContextValue {
  isLoggedIn: boolean;
  user: User | null;
  syncUserAuthState: () => Promise<void>;
  signUp: (formData: signUpParams) => Promise<void>;
  logIn: (formData: logInParams) => Promise<void>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { openSnackBar } = useSnackBar();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const initAuthenticatedUser = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);
    setIsLoggedIn(true);
    router.push('/home');
  };

  const signUp = useCallback(async ({ email, name, password, passwordConfirmation }: signUpParams) => {
    const response = await authenticateSignUp({
      email,
      name,
      password,
      passwordConfirmation,
    });

    if (response) {
      const { accessToken, refreshToken } = response;
      initAuthenticatedUser({ accessToken, refreshToken });
    } else {
      openSnackBar({ type: 'error', content: '회원가입에 실패했습니다.' });
    }
  }, []);

  const logIn = useCallback(async ({ email, password }: logInParams) => {
    const response = await authenticateLogIn({ email, password });

    if (response) {
      const { accessToken, refreshToken } = response;
      initAuthenticatedUser({ accessToken, refreshToken });
    } else {
      openSnackBar({ type: 'error', content: '일치하는 회원 정보가 없습니다.' });
    }
  }, []);

  const logOut = useCallback(() => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
    router.push('/home');
  }, []);

  const syncUserAuthState = useCallback(async () => {
    const userInfoResponse = await getUser();

    if (userInfoResponse) {
      setUser(userInfoResponse);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      user,
      syncUserAuthState,
      signUp,
      logIn,
      logOut,
    }),
    [user],
  );

  useEffect(() => {
    syncUserAuthState();
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
