import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './SearchForm.module.scss';
import { useRouter } from 'next/router';

interface SearchFormProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export default function SearchForm({ searchTerm, onSearch }: SearchFormProps) {
  const router = useRouter();
  const [value, setValue] = useState(searchTerm);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(value);
    if (!value) {
      router.push('/wikilist');
      return;
    }
    router.push(`/wikilist?q=${value}`);
  };

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <input
          className={`${styles.inputWidth} input input-search`}
          type="text"
          value={value}
          onChange={handleInputChange}
        />
      </form>
    </>
  );
}
