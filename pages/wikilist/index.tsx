import WikiCard from '@/components/WikiList/WikiCard';
import ProfileType from '@/types/types';
import styles from './WikiList.module.scss';
import { getProfileList } from '@/apis/auth/getProfileList';

export async function getServerSideProps() {
  let profileList = [];
  try {
    profileList = await getProfileList();
    console.log('API Response:', profileList);
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
  profileList: ProfileType[];
}

export default function WikiList({ profileList }: WikiListProps) {
  return (
    <div className={styles.profileList}>
      {profileList.length > 0 ? (
        profileList.map(profileCard => <WikiCard profileCard={profileCard} key={profileCard.id} />)
      ) : (
        <p>wiki가 없습니다.</p>
      )}
    </div>
  );
}
