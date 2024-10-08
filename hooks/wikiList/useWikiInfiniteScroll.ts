import { getProfileList } from '@/apis/getProfileList';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ProfileType from '@/types/types';

export const useWikiInfiniteScroll = (searchTerm: string) => {
  const [profileCards, setProfileCards] = useState<ProfileType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const router = useRouter();
  const [ref, inView] = useInView({ threshold: 0 });

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
      }
    } catch (error) {
      console.error('Failed to fetch profileCards', error);
    } finally {
      setLoading(false);
    }
  }, []);

  //searchTerm에 값이 할당되어 있고 router가 준비되었을 때 리스트 초기화
  useEffect(() => {
    if (searchTerm !== undefined && router.isReady) {
      setPage(1);
      setProfileCards([]);
      setHasMore(true);
      handleLoadProfileCards(1, 4, searchTerm);
    }
  }, [searchTerm]);

  //데이터 더 불러오기
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (inView && hasMore && page > 1) {
      setLoading(true);
      timer = setTimeout(() => {
        handleLoadProfileCards(page, 4, searchTerm);
      }, 300);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [inView]);

  return {
    profileCards,
    loading,
    ref,
  };
};
