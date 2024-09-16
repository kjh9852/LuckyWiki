import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import ProfileType from '@/types/types';
import WikiTitle from '@/components/myWiki/WikiTitle';
import WikiContent from '@/components/myWiki/WikiContent';
import ProfileDetails from '@/components/myWiki/ProfileDetails';
import styles from './[code].module.scss';
import { useState, useEffect } from 'react';
import { getProfile } from '@/apis/auth/getProfile';
import { getPing } from '@/apis/auth/updatePing';
import { useAuth } from '@/contexts/AuthProvider';
import { useSnackBar } from '@/contexts/SnackbarProvider';
import { usePingTimer } from '@/hooks/usePingTimer';
import ModalComponent from '@/components/@shared/modal/Modal';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { code } = context.params as { code: string };

  let profile = null;
  try {
    profile = await getProfile(code);
    console.log('API Response:', profile);
  } catch (error) {
    console.error('Failed to fetch profile', error);
    return {
      notFound: true,
    };
  }

  return {
    props: { profile },
  };
}

interface WikiProfileProps {
  profile: ProfileType;
}

export default function WikiProfile({ profile }: WikiProfileProps) {
  const router = useRouter();
  const [register, setResiter] = useState<string | null>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [loginUserId, setLoginUserId] = useState(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const { openSnackBar } = useSnackBar();

  const savePing = async () => {
    try {
      const res = await getPing(profile.code);
      setLoginUserId(res.userId);
      const registeredAt = new Date(res?.registeredAt);
      const dateIsoString = registeredAt.getTime().toString();
      localStorage.setItem('lastPingTime', dateIsoString);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const existingPing = localStorage.getItem('lastPingTime');
    setResiter(existingPing);
  }, []);

  const sameId = loginUserId !== undefined && loginUserId === user?.id;

  usePingTimer(register, router.isReady, savePing, [profile.code, sameId]);

  useEffect(() => {
    setIsEditing(() => {
      if (loginUserId) return true;
      return false;
    });
  }, [loginUserId]);

  const handleOpenModalButtonClick = () => {
    if (sameId) {
      return router.push(`/wiki/${profile.code}/edit`);
    }
    if (user === null) {
      return openSnackBar({ type: 'error', content: '로그인이 필요합니다' });
    }
    setIsModalOpen(prevOpen => !prevOpen);
  };

  const onCloseModalButtonClick = () => {
    setIsModalOpen(false);
  };

  if (!profile) {
    return <div>profile이 없습니다.</div>;
  }
  return (
    <>
      <ModalComponent
        title={`${profile.securityQuestion}?`}
        isAnswer={true}
        userCode={profile.code}
        isOpen={isModalOpen}
        onClose={onCloseModalButtonClick}
      />
      <div className={styles.wikiProfile}>
        <WikiTitle
          sameId={sameId}
          isEditing={isEditing}
          profile={profile}
          onOpenModalButtonClick={handleOpenModalButtonClick}
        />
        <ProfileDetails profile={profile} />
        <WikiContent profile={profile} />
      </div>
      <div className={styles.pcProfile}>
        <section>
          <WikiTitle
            sameId={sameId}
            isEditing={isEditing}
            profile={profile}
            onOpenModalButtonClick={handleOpenModalButtonClick}
          />
          <WikiContent profile={profile} />
        </section>
        <section className={styles.profileDetails}>
          <ProfileDetails profile={profile} />
        </section>
      </div>
    </>
  );
}
