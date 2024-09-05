import WikiCard from '@/components/WikiList/WikiCard';
import ProfileType from '@/types/types';
import styles from './WikiList.module.scss';
import { getProfileList } from '@/apis/auth/getProfileList';
import SearchForm from '@/components/WikiList/SearchForm';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Spinner from '@/components/WikiList/SPinner';
import { useInView } from 'react-intersection-observer';

export default function WikiList() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [profileCards, setProfileCards] = useState<ProfileType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView({ threshold: 0 });
  const [hasMore, setHasMore] = useState<boolean>(true);
  const router = useRouter();

  const handleLoadProfileCards = useCallback(async (page: number, pageSize: number, name: string) => {
    setLoading(true);

    try {
      const nextProfileCards = await getProfileList(page, 3, name);
      setProfileCards(prevCards => {
        return page === 1 ? nextProfileCards : [...prevCards, ...nextProfileCards];
      });
      setPage(prevPage => prevPage + 1);
      if (nextProfileCards.length < pageSize) {
        setHasMore(false);
        setPage(1);
      }
      console.log('filterAPI Response:', nextProfileCards);
    } catch (error) {
      console.error('Failed to fetch profileCards', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const initialName = router.query.name || '';
    if (typeof initialName === 'string') {
      setSearchTerm(initialName);
    }
  }, [router.query.name]);

  useEffect(() => {
    if (searchTerm || searchTerm === '') {
      console.log(page);
      console.log(hasMore);
      setPage(1);
      setProfileCards([]);
      setHasMore(true);
    }
    console.log(page);
    handleLoadProfileCards(page, 3, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (inView && hasMore) {
      handleLoadProfileCards(page, 3, searchTerm);
      console.log(inView, '무한 스크롤 요청');
    }
  }, [inView]);

  const hasSearchedProfile = profileCards.some(
    profileCard => profileCard.name.toLowerCase() === searchTerm.toLowerCase(),
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <section className={styles.searchForm}>
        <SearchForm searchTerm={searchTerm} onSearch={onSearch} />
        {hasSearchedProfile && (
          <p>
            {searchTerm}님을 총 <span>{profileCards.length}</span>명 찾았습니다.
          </p>
        )}
      </section>
      {profileCards.length > 0 ? (
        <>
          <section className={styles.profileList}>
            {profileCards.map(profileCard => (
              <WikiCard profileCard={profileCard} key={profileCard.id} />
            ))}
            <div ref={ref}>무한스크롤</div>
          </section>
        </>
      ) : (
        <section className={styles.noProfileFound}>
          <p>{searchTerm}과(와) 일치하는 검색 결과가 없어요.</p>
          <Image src={'/icon/icon-no-search.png'} alt="검색 결과 없음 아이콘" width={144} height={144} />
        </section>
      )}
    </>
  );
}
