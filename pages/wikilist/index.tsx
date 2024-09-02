import WikiCard from '@/components/WikiList/WikiCard';
import instance from '@/lib/api';
import ProfileCardType from '@/types/types';
import styles from './WikiList.module.scss';

export async function getServerSideProps() {
  let profileList = [];
  try {
    const res = await instance.get('/profiles', {
      params: {
        page: 1,
      },
    });
    profileList = res.data.list || [];
    console.log('API Response:', res.data.list);
  } catch (error) {
    console.error('Failed to fetch profileList', error);
    return {
      notFound: true,
    };
  }

  return {
    props: { profileList },
  };
}

interface WikiListProps {
  profileList: ProfileCardType[];
}

export default function WikiList({ profileList }: WikiListProps) {
  return (
    <div className={styles.profileList}>
      {profileList ? (
        profileList.map(profileCard => <WikiCard profileCard={profileCard} key={profileCard.id} />)
      ) : (
        <p>wiki가 없습니다.</p>
      )}
    </div>
  );
}
