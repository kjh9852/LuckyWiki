import { getTokens } from '@/utils/getTokens';

interface requestData {
  content?: string;
  nationality?: string;
  family?: string;
  bloodType?: string;
  nickname?: string;
  birthday?: string;
  sns?: string;
  job?: string;
  mbti?: string;
  city?: string;
  image?: string;
}

export const patchUser = async (code: string, data: requestData) => {
  const postData = {
    content: data.content,
    nationality: data.nationality,
    family: data.family,
    bloodType: data.bloodType,
    nickname: data.nickname,
    birthday: data.birthday,
    sns: data.sns,
    job: data.job,
    mbti: data.mbti,
    city: data.city,
    image: data.image,
  };

  const tokens = getTokens();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles/${code}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.accessToken}`,
    },
    body: JSON.stringify(postData),
  });
  const result = await response.json();
  return result;
};
