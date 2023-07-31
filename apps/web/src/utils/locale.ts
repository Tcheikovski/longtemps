import { Locale } from '@blizzard'

export const getTranslatedValue = (obj: Record<string, string>, locale: Locale): string => {
  const { fallbackLocale, defaultLocale } = useI18n<undefined, Locale>()
  if (locale in obj) {
    return obj[locale]
  }

  let fallback: Locale = defaultLocale
  if (typeof fallbackLocale.value === 'object' && !Array.isArray(fallbackLocale.value)) {
    fallback =
      fallbackLocale.value[locale].find(l => l in obj) ??
      fallbackLocale.value.default.find(l => l in obj) ??
      defaultLocale
  }

  return getTranslatedValue(obj, fallback)
}
