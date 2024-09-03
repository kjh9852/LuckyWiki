import { FormInputValues } from '@/hooks/useValidForm';
import { getTokens } from '@/utils/getTokens';

type updatePasswordParams = Record<
  keyof Pick<FormInputValues, 'currentPassword' | 'password' | 'passwordConfirmation'>,
  string
>;

export const updatePassword = async ({ currentPassword, password, passwordConfirmation }: updatePasswordParams) => {
  const { accessToken } = getTokens();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me/password`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ currentPassword, password, passwordConfirmation }),
  });

  return response.ok;
};
