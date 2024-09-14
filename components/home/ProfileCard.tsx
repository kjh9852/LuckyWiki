import { ProfileCardData } from '@/types/types';
import noProfileImage from '@/public/icon/icon-no-profile.png';
import quotesImage from '@/public/icon/icon-quotes.png';
import Image from 'next/image';
import React, { useId } from 'react';
import styles from './ProfileCard.module.scss';
import Link from 'next/link';
interface ProfileCardProps {
  profile: Omit<ProfileCardData, 'id'>;
  index: number;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const { code, updatedAt, image, family, ...profileTextValues } = profile;
  const date = new Date(updatedAt);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const updatedDate = `${year}.${month}.${day}`;

  const profileImageSrc = image || noProfileImage;

  return (
    <div className={styles.cardContainer}>
      <Link href={`/wiki/${code}`}>
        <div className={styles.imageCard}>
          <Image src={profileImageSrc} alt={'프로필 이미지'} width={350} height={450} priority />
        </div>
      </Link>
      <Link href={`/wiki/${code}`}>
        <div className={styles.textCard}>
          <article className={styles.quote}>
            <Image src={quotesImage} alt={'따옴표 이미지'} width={30} height={30} priority />
            <p>{family ? family : '아직 한 줄 소개가 작성되지 않았네요!'}</p>
          </article>
          <div>
            <article className={styles.summary}>
              {Object.values(profileTextValues).map(v => v && <span key={useId()}>{v}</span>)}
            </article>
            <article className={styles.cardFoot}>
              <Image src={profileImageSrc} alt={'프로필 이미지'} width={40} height={40} priority />
              <div>
                <p className={styles.name}>{profileTextValues.name}</p>
                <p className={styles.updateAt}>{updatedDate}</p>
              </div>
            </article>
          </div>
        </div>
      </Link>
    </div>
  );
}
