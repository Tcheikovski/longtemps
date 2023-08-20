export const getTranslatedValue = (obj: Record<string, string>, locale: string): string => {
  const { fallbackLocale, defaultLocale } = useI18n<undefined, string>()
  if (locale in obj) {
    return obj[locale]
  }

  let fallback: string = defaultLocale
  if (typeof fallbackLocale.value === 'object' && !Array.isArray(fallbackLocale.value)) {
    fallback =
      fallbackLocale.value[locale].find(l => l in obj) ??
      fallbackLocale.value.default.find(l => l in obj) ??
      defaultLocale
  }

  return getTranslatedValue(obj, fallback)
}
