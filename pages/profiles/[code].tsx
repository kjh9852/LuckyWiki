import { GetServerSidePropsContext } from 'next';
import ProfileType from '@/types/types';
import WikiTitle from '../../components/Profile/WikiTitle';
import WikiContent from '@/components/Profile/WikiContent';
import ProfileDetails from '@/components/Profile/ProfileDetails';
import instance from '../../lib/api';
import styles from './[code].module.scss';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { code } = context.params as { code: string };

  let profile = null;
  try {
    const res = await instance.get(`/profiles/${code}`);
    profile = res.data;
    console.log('API Response:', res.data);
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
  if (!profile) {
    return <div>No profile available</div>;
  }
  return (
    <div className={styles.wikiProfile}>
      <section>
        <WikiTitle profile={profile} />
        <WikiContent profile={profile} />
      </section>
      <section>
        <ProfileDetails profile={profile} />
      </section>
    </div>
  );
}
