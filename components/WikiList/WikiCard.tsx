import ProfileType from '@/types/types';
import Image from 'next/image';
import styles from './WikiCard.module.scss';
import { useCopyLink } from '@/hooks/useCopyLink';
import { useNavigate } from '@/hooks/wikiList/useNavigate';
import { useSnackBar } from '@/contexts/SnackbarProvider';
import { Button } from 'antd';
import { useMessage } from '@/hooks/useMessage';

interface WikiCardProps {
  profileCard: ProfileType;
}

export default function WikiCard({ profileCard }: WikiCardProps) {
  const { copyLink } = useCopyLink();
  const { navigateTo } = useNavigate();
  const { openSnackBar } = useSnackBar();
  const { contextHolder, showMessage, hideMessage } = useMessage();

  const LINK_URL = `https://luckywiki.vercel.app/wiki/${profileCard.code}`;
  const PROFILE_IMAGE = profileCard.image || '/icon/icon-no-profile.png';

  const handleCopyButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    copyLink(LINK_URL);
    openSnackBar({ type: 'success', content: '링크가 복사되었습니다.' });
  };

  const handleMoveCardClick = () => {
    navigateTo(`/wiki/${profileCard.code}`);
  };

  const handleMouseEnter = () => {
    showMessage('클릭하면 위키에 참여할 수 있는 링크가 복사됩니다.');
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
      {contextHolder}
      <Button
        className={styles.linkButton}
        onClick={handleCopyButtonClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={hideMessage}
      >
        <Image src="/icon/icon-link.png" alt="링크 아이콘" width={20} height={20} />
        <p>{LINK_URL}</p>
      </Button>
    </div>
  );
}
