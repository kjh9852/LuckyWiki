import ProfileType from '@/types/types';
import noProfileImage from '@/public/icon/icon-no-profile.png';
import quotesImage from '@/public/icon/icon-quotes.png';
import Image from 'next/image';
import React, { useId } from 'react';
import styles from './ProfileCard.module.scss';
import Link from 'next/link';
interface ProfileCardProps {
  profile: ProfileType;
  index: number;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const { code, updatedAt, image, ...profileTextValues } = profile;
  const date = new Date(updatedAt);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const updatedDate = `${year}.${month}.${day}`;

  const profileImageSrc = image || noProfileImage;

  return (
    <div className={styles.cardContainer}>
      <Link href={`/wiki/${code}`} className={styles.imageCard} data-code={code}>
        <Image src={profileImageSrc} alt={'프로필 이미지'} width={300} height={500} priority />
      </Link>
      <Link href={`/wiki/${code}`} className={styles.textCard} data-code={code}>
        <article className={styles.quote}>
          <Image src={quotesImage} alt={'따옴표 이미지'} width={30} height={30} priority />
          <p>한 줄 소개 프로필 작성할 때 추가 되나요?</p>
        </article>
        <div>
          <article className={styles.summary}>
            {Object.values(profileTextValues).map(v => v && <p key={useId()}>{v}</p>)}
          </article>
          <article className={styles.cardFoot}>
            <Image src={profileImageSrc} alt={'프로필 이미지'} width={40} height={40} priority />
            <div>
              <p className={styles.name}>{profileTextValues.name}</p>
              <p className={styles.updateAt}>{updatedDate}</p>
            </div>
          </article>
        </div>
      </Link>
    </div>
  );
}
