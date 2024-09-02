import { GetServerSidePropsContext } from 'next';
import ProfileType from '@/types/types';
import WikiTitle from '../../components/Wiki/WikiTitle';
import WikiContent from '@/components/Wiki/WikiContent';
import ProfileDetails from '@/components/Wiki/ProfileDetails';
import styles from './[code].module.scss';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
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
  const [isTabletMobile, setIsTabletMobile] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const tabletMobile = useMediaQuery({
    query: '(max-width: 1200px)',
  });

  useEffect(() => {
    if (tabletMobile) {
      setIsTabletMobile(true);
    } else {
      setIsTabletMobile(false);
    }
  }, [tabletMobile]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  if (!profile) {
    return <div>No profile available</div>;
  }
  return (
    <>
      {isTabletMobile ? (
        <div className={styles.wikiProfile}>
          <WikiTitle profile={profile} showModal={showModal} />
          <ProfileDetails profile={profile} />
          <WikiContent profile={profile} />
        </div>
      ) : (
        <div className={styles.pcProfile}>
          <section>
            <WikiTitle profile={profile} showModal={showModal} />
            <WikiContent profile={profile} />
          </section>
          <section className={styles.profileDetails}>
            <ProfileDetails profile={profile} />
          </section>
        </div>
      )}
      {/* {isModalVisible && <Modal closeModal={closeModal}/>} */}
    </>
  );
}
