import styles from './TheLatestSearch.module.scss';
import SearchForm from './SearchForm';
import { useLatestSearch } from '@/hooks/WikiList/useLatestSearch';

export default function TheLatestSearch() {
  const { keywords, handleAddKeyword, handleRemoveKeyword, handleRemoveAllKeywords } = useLatestSearch();

  return (
    <>
      <SearchForm onAddKeyword={handleAddKeyword} inputClassName={styles.listInputWidth} />
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
