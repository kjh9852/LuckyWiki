import styles from './RecentSearch.module.scss';
import SearchForm from './SearchForm';
import { useSearch } from '@/contexts/SearchProvider';

export default function RecentSearch() {
  const { keywords, setKeywords } = useSearch();

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
      <SearchForm inputClassName={styles.listInputWidth} />
      <section className={styles.recentSearch}>
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
