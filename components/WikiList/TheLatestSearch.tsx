import { useEffect, useState } from 'react';
import styles from './TheLatestSearch.module.scss';
import SearchForm from './SearchForm';
import { SearchType } from './types/SearchType';

interface KeywordsType {
  id: number;
  text: string;
}

export default function TheLatestSearch({ searchTerm, onSearch }: SearchType) {
  //로컬스토리지에 저장한 검색어 관리
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

  return (
    <>
      <SearchForm
        onAddKeyword={handleAddKeyword}
        searchTerm={searchTerm}
        onSearch={onSearch}
        inputClassName={styles.listInputWidth}
      />
      <section className={styles.theLatestSearch}>
        <div className={styles.title}>
          <h2>최근 검색어</h2>
          {keywords.length ? (
            <button type="button" onClick={handleRemoveAllKeywords}>
              전체 삭제
            </button>
          ) : (
            <button />
          )}
        </div>
        <ul>
          {keywords.length ? (
            keywords.map(keyword => (
              <li key={keyword.id}>
                <div className={styles.keyword}>{keyword.text}</div>
                <button className={styles.removeButton} onClick={() => handleRemoveKeyword(keyword.id)}>
                  X
                </button>
              </li>
            ))
          ) : (
            <div className={styles.keywordNone}>최근 검색어가 없습니다.</div>
          )}
        </ul>
      </section>
    </>
  );
}
