"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "@/i18n/useTranslations";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
}: SearchBarProps) {
  const { t } = useTranslations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const isClearable = value.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="flex-1 w-full max-w-md">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-[color:var(--muted-text-color)]" />
          </div>
          <input
            type="text"
            className="block w-full p-3 pl-10 pr-10 text-sm rounded-lg border border-[color:var(--border-color)] bg-[color:var(--surface-color)] text-[color:var(--text-color)] placeholder:text-[color:var(--muted-text-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-color)] transition"
            placeholder={t("search.placeholder")}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label={t("labels.search")}
          />
          {isClearable && (
            <button
              type="button"
              onClick={onClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[color:var(--muted-text-color)] hover:text-[color:var(--text-color)] transition"
              aria-label={t("labels.clearSearch")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-3 text-sm font-medium rounded-lg bg-[color:var(--text-color)] text-[color:var(--background-color)] hover:opacity-90 transition"
        >
          {t("labels.search")}
        </button>
      </div>
    </form>
  );
}
