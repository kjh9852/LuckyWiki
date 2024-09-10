import WikiCard from '@/components/WikiList/WikiCard';
import ProfileType from '@/types/types';
import styles from './WikiList.module.scss';
import { getProfileList } from '@/apis/auth/getProfileList';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Spinner from '@/components/WikiList/SPinner';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import TheLatestSearch from '@/components/WikiList/TheLatestSearch';

export default function WikiList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [profileCards, setProfileCards] = useState<ProfileType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView({ threshold: 0 });
  const [hasMore, setHasMore] = useState<boolean>(true);

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

  //searchTerm을 input의 value값에 따라 변경
  const onSearch = (term: string) => {
    setSearchTerm(term);
  };

  //searchTerm에 값이 할당되어 있고 router가 준비되었을 때 리스트 초기화
  useEffect(() => {
    if (searchTerm !== undefined && router.isReady) {
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
        <TheLatestSearch searchTerm={searchTerm} onSearch={onSearch} />
        {hasSearchedProfile && (
          <p>
            <span>{searchTerm}</span>님을 총 <span>{profileCards.length}</span>명 찾았습니다.
          </p>
        )}
      </section>
      {profileCards.length > 0 ? (
        <>
          <section className={styles.profileList}>
            {profileCards.map(profileCard => (
              <WikiCard profileCard={profileCard} key={profileCard.id} />
            ))}
            <div ref={ref} className={styles.infiniteScrollText}></div>
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
