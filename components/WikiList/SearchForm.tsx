import { SearchType } from './types/SearchType';
import { useSearchForm } from '@/hooks/WikiList/useSearchForm';

export default function SearchForm({ inputClassName, onAddKeyword }: SearchType) {
  const { value, handleInputChange } = useSearchForm(onAddKeyword);

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
