"use client";

import { useLocale } from "@/components/AppProviders";
import { localeLabels, SUPPORTED_LOCALES } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import { THEMES, type ThemeName, useTheme } from "@/lib/themejs";

const formatThemeLabel = (themeKey: string) =>
  themeKey.charAt(0).toUpperCase() + themeKey.slice(1);

export default function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const { t } = useTranslations();

  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--border-color)] bg-[color:var(--background-color)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[color:var(--text-color)]">
            {t("header.title")}
          </h1>
          <p className="text-sm text-[color:var(--muted-text-color)]">
            {t("header.subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <span className="text-[color:var(--muted-text-color)]">
              {t("labels.language")}
            </span>
            <select
              className="px-3 py-2 rounded-lg border border-[color:var(--border-color)] bg-[color:var(--surface-color)] text-[color:var(--text-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-color)]"
              value={locale}
              onChange={(event) =>
                setLocale(event.target.value as (typeof SUPPORTED_LOCALES)[number])
              }
            >
              {SUPPORTED_LOCALES.map((supportedLocale) => (
                <option key={supportedLocale} value={supportedLocale}>
                  {localeLabels[supportedLocale]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm">
            <span className="text-[color:var(--muted-text-color)]">
              {t("labels.theme")}
            </span>
            <select
              className="px-3 py-2 rounded-lg border border-[color:var(--border-color)] bg-[color:var(--surface-color)] text-[color:var(--text-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-color)]"
              value={theme}
              onChange={(event) => setTheme(event.target.value as ThemeName)}
            >
              {Object.keys(THEMES).map((themeKey) => (
                <option key={themeKey} value={themeKey}>
                  {formatThemeLabel(themeKey)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </header>
  );
}
