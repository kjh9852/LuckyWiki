import ProfileType from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './WikiTitle.module.scss';

interface WikiTitleProps {
  profile: ProfileType;
}

export default function WikiTitle({ profile }: WikiTitleProps) {
  return (
    <div className={styles.wikiTitle}>
      <header>
        <h1>{profile.name}</h1>
        <button>위키 참여하기</button>
      </header>
      <Link className={styles.link} href={`https://www.wikied.kr/profiles/${profile.code}`}>
        <Image src="/icon/icon-link.png" alt="링크 아이콘" width={20} height={20} />
        <p>https://www.wikied.kr/profiles/{profile.code}</p>
      </Link>
    </div>
  );
}
