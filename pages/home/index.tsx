import ProfileCard from '@/components/home/ProfileCard';
import ProfileType, { ProfileCardData } from '@/types/types';
import styles from './Home.module.scss';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import { Bounce, Fade, JackInTheBox } from 'react-awesome-reveal';
import { getProfile } from '@/apis/auth/getProfile';

interface HomeProps {
  profileList: ProfileCardData[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  let profileList = null;
  try {
    const query = new URLSearchParams({
      pageSize: '8',
    });
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles?${query}`);
    const ProfileCodeList = await response
      .json()
      .then(res => res.list.map((profile: Record<string, string>) => profile.code));

    const profileDetailList = await Promise.all(
      ProfileCodeList.map((code: string) => getProfile(code).then(result => result)),
    );

    // 부트캠프에서 제공하는 API에서 Profile을 리스트로 조회하는 것과 하나를 조회 하는 것이 서로 다른 데이터를 주기 때문에
    // 메인 페이지에서 상세 데이터를 가져와야 하고, 필요없는 데이터를 거르는 작업이 필요 했음
    const result = profileDetailList.map((profileDetail: ProfileType) => {
      // content, securityQuestion은 사용되지 않음
      const {
        id,
        birthday,
        bloodType,
        city,
        code,
        family,
        image,
        job,
        mbti,
        name,
        nationality,
        nickname,
        sns,
        updatedAt,
      } = profileDetail;
      return {
        id,
        birthday,
        bloodType,
        city,
        code,
        family,
        image,
        job,
        mbti,
        name,
        nationality,
        nickname,
        sns,
        updatedAt,
      };
    });

    profileList = result;
  } catch {
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
        <Fade>
          <h1 className={styles.textXl}>
            친구들이
            <br />내 위키를 만들어준다니,
          </h1>
        </Fade>
        <Bounce delay={500}>
          <h1 className={styles.textXl}>
            완전 <span className={classNames(styles.textXl, styles.cloverText, styles.green)}>럭키위키</span>자나!?
          </h1>
        </Bounce>
        <JackInTheBox delay={900}>
          <p className={classNames(styles.description, styles.textMd)}>
            친구들이 만들어 준 나만의 <span className={classNames(styles.cloverText, styles.green)}>위키</span>
            <br />
            친구들의 위키도 구경해보세요<span className={styles.cloverText}>!</span>
          </p>
        </JackInTheBox>
      </section>
      <section className={styles.cardListContainer}>
        {profileList?.map((profile, index) => {
          // ProfileCard에서 id는 사용되지 않음
          const { id, ...restProfile } = profile;
          return <ProfileCard key={id} profile={restProfile} index={index} />;
        })}
      </section>
    </div>
  );
}
