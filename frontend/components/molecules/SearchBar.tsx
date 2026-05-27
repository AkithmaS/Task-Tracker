import { Input } from "@/components/atoms/Input";

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
};

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = "Search tasks...",
}: SearchBarProps) => {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 104.113 12.114l4.761 4.762a.75.75 0 001.06-1.06l-4.761-4.762A6.75 6.75 0 0010.5 3.75zm-5.25 6.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <Input
        className="pl-9"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search tasks"
      />
      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500"
          aria-label="Clear search"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
};

export default SearchBar;
