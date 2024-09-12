import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

interface SearchContextType {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  //searchTerm을 input의 value값에 따라 변경
  const onSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const contextValue = useMemo(
    () => ({
      searchTerm,
      onSearch,
    }),
    [searchTerm, onSearch],
  );

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('반드시 SearchProvider 안에서 사용해야 합니다.');
  }
  return context;
};
