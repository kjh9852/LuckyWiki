import WikiCard from '@/components/WikiList/WikiCard';
import ProfileType from '@/types/types';
import styles from './WikiList.module.scss';
import { getProfileList } from '@/apis/auth/getProfileList';
import SearchForm from '@/components/WikiList/SearchForm';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Spinner from '@/components/WikiList/SPinner';

export default function WikiList() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [profileCards, setProfileCards] = useState<ProfileType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleLoadProfileCards = useCallback(async (name: string) => {
    setLoading(true);

    try {
      const nextProfileCards = await getProfileList({ name });
      setProfileCards(nextProfileCards);
      console.log('filterAPI Response:', profileCards);
    } catch (error) {
      console.error('Failed to fetch profileList', error);
      return {
        notFound: true,
      };
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
    if (searchTerm) {
      handleLoadProfileCards(searchTerm);
    } else {
      handleLoadProfileCards('');
    }
  }, [searchTerm, handleLoadProfileCards]);

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
        <section className={styles.profileList}>
          {profileCards.map(profileCard => (
            <WikiCard profileCard={profileCard} key={profileCard.id} />
          ))}
        </section>
      ) : (
        <section className={styles.noProfileFound}>
          <p>{searchTerm}과 일치하는 검색 결과가 없어요.</p>
          <Image src={'/icon/icon-no-search.png'} alt="검색 결과 없음 아이콘" width={144} height={144} />
        </section>
      )}
    </>
  );
}
