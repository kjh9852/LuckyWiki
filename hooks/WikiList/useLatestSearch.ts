import { useEffect, useState } from 'react';

interface KeywordsType {
  id: number;
  text: string;
}

export const useLatestSearch = () => {
  const [keywords, setKeywords] = useState<KeywordsType[]>([]);

  //브라우저가 렌더링된 상태에서 실행
  //이전에 저장된 검색어 가져오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('keywords') || '[]';
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

  //검색어 삭제
  const handleRemoveKeyword = (id: number) => {
    const nextKeyword = keywords.filter(keyword => keyword.id !== id);
    setKeywords(nextKeyword);
  };

  //검색어 전체 삭제
  const handleRemoveAllKeywords = () => {
    setKeywords([]);
  };

  return {
    keywords,
    handleAddKeyword,
    handleRemoveKeyword,
    handleRemoveAllKeywords,
  };
};
