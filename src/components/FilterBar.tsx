"use client";

import { useTranslations } from "@/i18n/useTranslations";

interface FilterBarProps {
  orientation: string;
  setOrientation: (v: string) => void;
  color: string;
  setColor: (v: string) => void;
  orderBy: string;
  setOrderBy: (v: string) => void;
  hasFilters: boolean;
  onReset: () => void;
}

export default function FilterBar({
  orientation,
  setOrientation,
  color,
  setColor,
  orderBy,
  setOrderBy,
  hasFilters,
  onReset,
}: FilterBarProps) {
  const { t } = useTranslations();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        className="px-3 py-2 text-sm border border-[color:var(--border-color)] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-color)] bg-[color:var(--surface-color)] text-[color:var(--text-color)]"
        value={orientation}
        onChange={(e) => setOrientation(e.target.value)}
        aria-label={t("labels.orientation")}
      >
        <option value="">{t("filters.orientation.any")}</option>
        <option value="landscape">{t("filters.orientation.landscape")}</option>
        <option value="portrait">{t("filters.orientation.portrait")}</option>
        <option value="squarish">{t("filters.orientation.square")}</option>
      </select>

      <select
        className="px-3 py-2 text-sm border border-[color:var(--border-color)] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-color)] bg-[color:var(--surface-color)] text-[color:var(--text-color)]"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        aria-label={t("labels.color")}
      >
        <option value="">{t("filters.color.any")}</option>
        <option value="black_and_white">{t("filters.color.black_and_white")}</option>
        <option value="black">{t("filters.color.black")}</option>
        <option value="white">{t("filters.color.white")}</option>
        <option value="yellow">{t("filters.color.yellow")}</option>
        <option value="orange">{t("filters.color.orange")}</option>
        <option value="red">{t("filters.color.red")}</option>
        <option value="purple">{t("filters.color.purple")}</option>
        <option value="magenta">{t("filters.color.magenta")}</option>
        <option value="green">{t("filters.color.green")}</option>
        <option value="teal">{t("filters.color.teal")}</option>
        <option value="blue">{t("filters.color.blue")}</option>
      </select>

      <select
        className="px-3 py-2 text-sm border border-[color:var(--border-color)] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-color)] bg-[color:var(--surface-color)] text-[color:var(--text-color)]"
        value={orderBy}
        onChange={(e) => setOrderBy(e.target.value)}
        aria-label={t("labels.sort")}
      >
        <option value="relevant">{t("filters.sort.relevant")}</option>
        <option value="latest">{t("filters.sort.latest")}</option>
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="px-3 py-2 text-sm border border-[color:var(--border-color)] rounded-lg text-[color:var(--text-color)] hover:bg-[color:var(--surface-strong)] transition"
        >
          {t("filters.reset")}
        </button>
      )}
    </div>
  );
}
