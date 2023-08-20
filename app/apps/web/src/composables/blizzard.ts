import { Locale } from '@longtemps/blizzard'

export const useLocale = () => {
  const { locale } = useI18n<undefined, Locale>()
  return locale
}
