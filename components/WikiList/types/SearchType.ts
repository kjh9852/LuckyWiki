interface SearchType {
  searchTerm: string;
  onSearch: (term: string) => void;
  inputClassName?: string;
  onAddKeyword?: (text: string) => void;
}

export type { SearchType };
