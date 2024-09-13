import WikiCard from '@/components/WikiList/WikiCard';
import styles from './WikiList.module.scss';
import Image from 'next/image';
import Spinner from '@/components/WikiList/SPinner';
import RecentSearch from '@/components/WikiList/RecentSearch';
import { useSearch } from '@/contexts/SearchProvider';
import { useWikiInfiniteScroll } from '@/hooks/WikiList/useWikiInfiniteScroll';

export default function WikiList() {
  const { searchTerm } = useSearch();
  const { profileCards, loading, ref } = useWikiInfiniteScroll(searchTerm);

  const hasSearchedProfile = profileCards.some(
    profileCard => profileCard.name.trim().toLowerCase() === searchTerm.trim().toLowerCase(),
  );

  return (
    <>
      <section className={styles.searchForm}>
        <RecentSearch />
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
