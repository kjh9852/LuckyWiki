import ProfileType from '@/types/types';
import Image from 'next/image';
import styles from './WikiCard.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface WikiCardProps {
  profileCard: ProfileType;
}

export default function WikiCard({ profileCard }: WikiCardProps) {
  const router = useRouter();
  const linkURL = `https://www.wikied.kr/wiki/${profileCard.code}`;

  const handleCopyButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(linkURL);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleMoveCardClick = () => {
    router.push(`/wiki/${profileCard.code}`, undefined, { shallow: true });
  };

  const profileImage = profileCard.image || '/icon/icon-profile.png';

  return (
    <div className={styles.profileCard} onClick={handleMoveCardClick}>
      <Image className={styles.image} src={profileImage} alt="프로필 이미지" width={85} height={85} />
      <section className={styles.detail}>
        <h1>{profileCard.name}</h1>
        <p>
          {profileCard.city}, {profileCard.nationality}
        </p>
        <p>{profileCard.job}</p>
      </section>
      <button className={styles.linkButton} onClick={handleCopyButtonClick}>
        <Image src="/icon/icon-link.png" alt="링크 아이콘" width={20} height={20} />
        <p>{linkURL}</p>
      </button>
    </div>
  );
}
