import { useEffect } from 'react';
import { useSearch } from '@/contexts/SearchProvider';

export const useRecentSearch = () => {
  const { keywords, setKeywords } = useSearch();

  //이전에 저장된 검색어 가져오기
  useEffect(() => {
    const result = localStorage.getItem('keywords');
    if (result) {
      setKeywords(JSON.parse(result));
    }
  }, []);

  //keywords 변경될 경우 로컬스토리지에 keywords 저장
  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  //검색어 추가
  const handleAddKeyword = (text: string) => {
    if (text.trim() === '') {
      return;
    }
    const newKeyword = {
      id: Date.now(),
      text: text,
    };
    setKeywords([newKeyword, ...keywords]);
  };

  return {
    handleAddKeyword,
  };
};
