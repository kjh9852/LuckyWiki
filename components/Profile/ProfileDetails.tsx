import ProfileType from '@/types/types';
import Image from 'next/image';
import styles from './ProfileDetail.module.scss';
import Link from 'next/link';

interface ProfileDetailProps {
  profile: ProfileType;
}

export default function ProfileDetails({ profile }: ProfileDetailProps) {
  const profileImage = profile.image || '/icon/icon-profile.png';
  return (
    <div className={styles.profileDetail}>
      <section className={styles.profileImage}>
        <Image src={profileImage} className={styles.image} alt="프로필 이미지" width={200} height={200} />
      </section>
      <div className={styles.profileInfo}>
        <section className={styles.profileKey}>
          <p>거주 도시</p>
          <p>MBTI</p>
          <p>직업</p>
          <p className={styles.hide}>SNS 계정</p>
          <p className={styles.hide}>생일</p>
          <p className={styles.hide}>별명</p>
          <p className={styles.hide}>혈액형</p>
          <p className={styles.hide}>국적</p>
        </section>
        <section className={styles.profileValue}>
          <p>{profile.city}</p>
          <p>{profile.mbti}</p>
          <p>{profile.job}</p>
          <Link className={styles.hide} href={profile.sns}>
            <Image src="/icon/icon-instagram.png" alt="sns 아이콘" width={24} height={24} />
          </Link>
          <p className={styles.hide}>{profile.birthday}</p>
          <p className={styles.hide}>{profile.nickname}</p>
          <p className={styles.hide}>{profile.bloodType}</p>
          <p className={styles.hide}>{profile.nationality}</p>
        </section>
      </div>
    </div>
  );
}
