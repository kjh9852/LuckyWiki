export default interface ProfileType {
  updatedAt: Date;
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

export default interface UserType {
  profile: {
    code: string;
    id: number;
  };
  updatedAt: Date;
  createdAt: Date;
  teamId: string;
  name: string;
  id: number;
}

export default interface ProfileCardType {
  id: number;
  code: string;
  image: string;
  city: string;
  nationality: string;
  job: string;
  updatedAt: Date;
  name: string;
}
