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

export interface UserProfile {
  code: string;
  id: number;
  image: string;
  securityQuestion: string;
}

export interface Notification {
  content: string;
  createdAt: Date;
  id: number;
}
