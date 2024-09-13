import ProfileType from '@/types/types';
import Image from 'next/image';
import styles from './ProfileDetail.module.scss';
import { useState } from 'react';

interface ProfileDetailProps {
  profile: ProfileType;
}

const INSTAGRAM_URL = 'https://www.instagram.com/';

export default function ProfileDetails({ profile }: ProfileDetailProps) {
  const profileImage = profile.image || '/icon/icon-profile.png';
  const [isMoreView, setIsMoreView] = useState<string>('none');

  const handleButtonClick = () => {
    setIsMoreView(prev => (prev === 'active' ? 'none' : 'active'));
  };

  return (
    <div className={`${styles.profileContainer} ${isMoreView === 'active' ? styles.active : ''}`}>
      <div className={styles.profileDetail}>
        <section className={styles.profileImage}>
          <Image src={profileImage} className={styles.image} alt="프로필 이미지" width={200} height={200} />
        </section>
        <div className={styles.profileInfo}>
          <section className={styles.profileKey}>
            <p>거주 도시</p>
            <p>MBTI</p>
            <p>직업</p>
            <p>인스타그램</p>
            <p>생일</p>
            <p>별명</p>
            <p>혈액형</p>
            <p>국적</p>
          </section>
          <section className={styles.profileValue}>
            <p>{profile.city}</p>
            <p>{profile.mbti}</p>
            <p>{profile.job}</p>
            {profile.sns ? (
              <a href={`${INSTAGRAM_URL}${profile.sns}`} target="_blank" rel="noopener noreferrer">
                <Image src="/icon/icon-instagram.png" alt="sns 아이콘" width={24} height={24} />
              </a>
            ) : (
              <p></p>
            )}
            <p>{profile.birthday}</p>
            <p>{profile.nickname}</p>
            <p>{profile.bloodType}</p>
            <p>{profile.nationality}</p>
          </section>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleButtonClick}>
          <Image src="/icon/icon-more-button.png" alt="프로필 토글 버튼 아이콘" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
