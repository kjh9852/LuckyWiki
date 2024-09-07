import ProfileCard from '@/components/home/ProfileCard';
import ProfileType from '@/types/types';
import styles from './index.module.scss';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';

interface HomeProps {
  profileList: ProfileType[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  let profileList;
  try {
    const query = new URLSearchParams({
      page: '1',
      pageSize: '8',
    });
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles?${query}`);
    const result = await response.json();

    profileList = result.list;
  } catch (error) {
    console.error('Failed', error);
    return {
      notFound: true,
    };
  }

  return { props: { profileList } };
};

export default function Home({ profileList }: HomeProps) {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.paragraph}>
        <h1 className={styles.textXl}>
          친구들이
          <br />
          내 위키를 만들어준다니,
          <br />
          완전 <span className={classNames(styles.textXl, styles.cloverText, styles.green)}>럭키위키</span>자나!?
        </h1>
        <p className={classNames(styles.description, styles.textMd)}>
          친구들이 만들어 준 나만의 <span className={classNames(styles.cloverText, styles.green)}>위키</span>
          <br />
          친구들의 위키도 구경해보세요<span className={styles.cloverText}>!</span>
        </p>
      </section>
      <section className={styles.cardListContainer}>
        {profileList?.map((profile, index) => <ProfileCard key={profile.id} profile={profile} index={index} />)}
      </section>
    </div>
  );
}
