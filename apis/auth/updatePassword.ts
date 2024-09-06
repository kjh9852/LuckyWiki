import { FormInputValues } from '@/hooks/useValidForm';
import { fetchWithTokenRefresh } from './fetchWithTokenRefresh';

type updatePasswordParams = Record<
  keyof Pick<FormInputValues, 'currentPassword' | 'password' | 'passwordConfirmation'>,
  string
>;

export const updatePassword = async ({ currentPassword, password, passwordConfirmation }: updatePasswordParams) => {
  const response = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me/password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPassword, password, passwordConfirmation }),
  });

  return response;
};
