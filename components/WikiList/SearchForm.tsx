import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useDebounce from '@/hooks/useDebounce';

interface SearchFormProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  inputClassName?: string;
}

export default function SearchForm({ searchTerm, onSearch, inputClassName }: SearchFormProps) {
  const router = useRouter();
  const { name } = router.query;
  const [value, setValue] = useState<string>(searchTerm);

  const debouncedValue = useDebounce(value, 1000);

  //주소창에 검색어 쿼리치면 value값 변경
  useEffect(() => {
    if (typeof name === 'string') {
      setValue(name);
    }
  }, [name]);

  //debouncedValue이 searchTerm과 다를 때
  useEffect(() => {
    if (debouncedValue !== searchTerm) {
      onSearch(debouncedValue);
      router.push(`/wikilist?name=${debouncedValue}`, undefined, { shallow: true });
    }
  }, [debouncedValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input
        className={`${inputClassName} input input-search`}
        type="text"
        value={value}
        onChange={handleInputChange}
      />
    </>
  );
}
