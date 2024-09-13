import ProfileType from '@/types/types';
import Image from 'next/image';
import styles from './WikiCard.module.scss';
import { useCopyLink } from '@/hooks/useCopyLink';
import { useNavigate } from '@/hooks/WikiList/useNavigate';

interface WikiCardProps {
  profileCard: ProfileType;
}

export default function WikiCard({ profileCard }: WikiCardProps) {
  const { copyLink } = useCopyLink();
  const { navigateTo } = useNavigate();

  const LINK_URL = `https://www.wikied.kr/wiki/${profileCard.code}`;
  const PROFILE_IMAGE = profileCard.image || '/icon/icon-profile.png';

  const handleCopyButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    copyLink(LINK_URL);
  };

  const handleMoveCardClick = () => {
    navigateTo(`/wiki/${profileCard.code}`);
  };

  return (
    <div className={styles.profileCard} onClick={handleMoveCardClick}>
      <Image className={styles.image} src={PROFILE_IMAGE} alt="프로필 이미지" width={85} height={85} />
      <section className={styles.detail}>
        <h1>{profileCard.name}</h1>
        <p>
          {profileCard.city}, {profileCard.nationality}
        </p>
        <p>{profileCard.job}</p>
      </section>
      <button className={styles.linkButton} onClick={handleCopyButtonClick}>
        <Image src="/icon/icon-link.png" alt="링크 아이콘" width={20} height={20} />
        <p>{LINK_URL}</p>
      </button>
    </div>
  );
}
