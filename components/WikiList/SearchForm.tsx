import { ChangeEvent, useEffect, useState } from 'react';
import styles from './SearchForm.module.scss';
import { useRouter } from 'next/router';
import useDebounce from '@/hooks/useDebounce';

interface SearchFormProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export default function SearchForm({ searchTerm, onSearch }: SearchFormProps) {
  const router = useRouter();
  const [value, setValue] = useState(searchTerm);

  const debouncedValue = useDebounce(value, 1000);

  useEffect(() => {
    if (debouncedValue) {
      onSearch(debouncedValue);
      router.push(`/wikilist?name=${value}`, undefined, { shallow: true });
    }
  }, [debouncedValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input
        className={`${styles.inputWidth} input input-search`}
        type="text"
        value={value}
        onChange={handleInputChange}
      />
    </>
  );
}
