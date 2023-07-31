import { Guild, Locale } from '@blizzard'
import { Pinia } from 'pinia'

export const useLocale = () => {
  const { locale } = useI18n<undefined, Locale>()
  return locale
}

export const useGuild = (pinia?: Pinia): Ref<Guild | null> => {
  const store = useGuildStore(pinia)
  const { guild } = storeToRefs(store)

  return guild
}

export const useGuildAsync = async (pinia?: Pinia): Promise<Ref<Guild>> => {
  const store = useGuildStore(pinia)
  const { guild, isGuildReady } = storeToRefs(store)

  await until(isGuildReady).toBe(true)

  return guild as Ref<Guild>
}
