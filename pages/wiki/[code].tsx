import { GetServerSidePropsContext } from 'next';
import ProfileType from '@/types/types';
import WikiTitle from '../../components/Wiki/WikiTitle';
import WikiContent from '@/components/Wiki/WikiContent';
import ProfileDetails from '@/components/Wiki/ProfileDetails';
import styles from './[code].module.scss';
import { useState } from 'react';
import { getProfile } from '@/apis/auth/getProfile';

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModalButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModalButtonClick = () => {
    setIsModalVisible(false);
  };

  if (!profile) {
    return <div>profile이 없습니다.</div>;
  }
  return (
    <>
      <div className={styles.wikiProfile}>
        <WikiTitle profile={profile} onOpenModalButtonClick={handleOpenModalButtonClick} />
        <ProfileDetails profile={profile} />
        <WikiContent profile={profile} />
      </div>
      <div className={styles.pcProfile}>
        <section className={styles.profileContent}>
          <WikiTitle profile={profile} onOpenModalButtonClick={handleOpenModalButtonClick} />
          <WikiContent profile={profile} />
        </section>
        <section className={styles.profileDetails}>
          <ProfileDetails profile={profile} />
        </section>
      </div>
      {/* {isModalVisible && <Modal onCloseModalButtonClick={handleCloseModalButtonClick}/>} */}
    </>
  );
}
