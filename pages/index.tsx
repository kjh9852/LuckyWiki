import ProfileType from '@/types/types';

interface HomeProps {
  profileList: ProfileType[];
}

export const getStaticProps = async () => {
  let profileList;
  try {
    const query = new URLSearchParams({
      pageSize: '10',
    });
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles?${query}`, {
      next: { revalidate: 60 * 60 * 24 }, // 24시간 텀으로 업데이트
    });
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
  return <main>Home</main>;
}
