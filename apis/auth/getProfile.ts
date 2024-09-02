interface getProfileReturn {
  updatedAt: string;
  securityQuestion: string;
  teamId: string;
  content: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

export const getProfile = async (code: string): Promise<getProfileReturn | undefined> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles/${code}`);
  if (!response.ok) {
    return undefined;
  }
  const result = await response.json();
  return result;
};
