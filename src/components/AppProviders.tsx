"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  messages,
  rtlLocales,
  type Locale,
} from "@/i18n/messages";
import { ThemeProvider } from "@/lib/themejs";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);
const LOCALE_STORAGE_KEY = "photo-gallery:locale";

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within AppProviders.");
  }

  return context;
}

const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) {
    return stored as Locale;
  }

  const browserLocale = navigator.language?.split("-")[0] as Locale | undefined;
  if (browserLocale && SUPPORTED_LOCALES.includes(browserLocale)) {
    return browserLocale;
  }

  return DEFAULT_LOCALE;
};

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = rtlLocales.has(locale) ? "rtl" : "ltr";
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <ThemeProvider defaultTheme="light">
      <LocaleContext.Provider value={value}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          {children}
        </IntlProvider>
      </LocaleContext.Provider>
    </ThemeProvider>
  );
}
