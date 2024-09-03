import WikiCard from '@/components/WikiList/WikiCard';
import ProfileType from '@/types/types';
import styles from './WikiList.module.scss';
import { getProfileList } from '@/apis/auth/getProfileList';
import SearchForm from '@/components/WikiList/SearchForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const onSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredWiki = profileList.filter(wiki => wiki.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    const initialSearchTerm = router.query.q || '';
    if (typeof initialSearchTerm === 'string') {
      setSearchTerm(initialSearchTerm);
    }
  }, [router.query.q]);

  return (
    <>
      <section className={styles.searchForm}>
        <SearchForm searchTerm={searchTerm} onSearch={onSearch} />
        {filteredWiki.length !== 0 && (
          <p>
            "{searchTerm}"님을 총 <span>{filteredWiki.length}</span>명 찾았습니다.
          </p>
        )}
      </section>
      {filteredWiki.length > 0 ? (
        <section className={styles.profileList}>
          {filteredWiki.map(profileCard => (
            <WikiCard profileCard={profileCard} key={profileCard.id} />
          ))}
        </section>
      ) : (
        <section className={styles.noProfileFound}>
          <p>"{searchTerm}"과 일치하는 검색 결과가 없어요.</p>
          <Image src={'/icon/icon-no-search.png'} alt="검색 결과 없음 아이콘" width={144} height={144} />
        </section>
      )}
    </>
  );
}
