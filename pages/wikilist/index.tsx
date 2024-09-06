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
  const { name } = router.query;

  const handleLoadProfileCards = useCallback(async (page: number, pageSize: number, name: string) => {
    if (!hasMore) {
      return;
    }
    setLoading(true);
    try {
      const nextProfileCards = await getProfileList(page, pageSize, name);
      setProfileCards(prevCards => [...prevCards, ...nextProfileCards]);
      setPage(prevPage => prevPage + 1);
      if (nextProfileCards.length < pageSize) {
        setHasMore(false);
        setPage(1);
      }
    } catch (error) {
      console.error('Failed to fetch profileCards', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSearch = (term: string) => {
    setSearchTerm(term);
  };

  //주소창에 검색어 쿼리치면 데이터 요청
  useEffect(() => {
    if (typeof name === 'string') {
      setSearchTerm(name);
    }
  }, [name]);

  //searchTerm 바뀌면 리스트 초기화
  useEffect(() => {
    if (searchTerm !== undefined) {
      setProfileCards([]);
      setHasMore(true);
      handleLoadProfileCards(1, 4, searchTerm);
    }
  }, [searchTerm]);

  //데이터 더 불러오기
  useEffect(() => {
    if (inView && hasMore && page > 1) {
      handleLoadProfileCards(page, 4, searchTerm);
    }
  }, [inView]);

  const hasSearchedProfile = profileCards.some(
    profileCard => profileCard.name.toLowerCase() === searchTerm.toLowerCase(),
  );

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
            <div ref={ref} className={styles.infiniteScrollText}>
              무한스크롤
            </div>
            {loading && <Spinner />}
          </section>
        </>
      ) : (
        !loading && (
          <section className={styles.noProfileFound}>
            <p>{searchTerm}과(와) 일치하는 검색 결과가 없어요.</p>
            <Image src={'/icon/icon-no-search.png'} alt="검색 결과 없음 아이콘" width={144} height={144} />
          </section>
        )
      )}
    </>
  );
}
