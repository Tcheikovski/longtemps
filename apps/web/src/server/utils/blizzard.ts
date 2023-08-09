import { AnyObject } from '@longtemps/core'
import { Api } from '@longtemps/blizzard'
import { BattlenetService } from '../services'

export const useBattlenetService = () => useContainer().get(BattlenetService)

type BlizzardFetch = <T extends AnyObject>(path: string, namespace: Api.Namespace, token?: string) => Promise<Api.Document<T>>
type BlizzardNamespacedFetch = <T extends AnyObject>(path: string, token?: string) => Promise<Api.Document<T>>
interface $BlizzardFetch extends BlizzardFetch {
  static: BlizzardNamespacedFetch
  dynamic: BlizzardNamespacedFetch
  profile: BlizzardNamespacedFetch
}

const blizzardFetch: BlizzardFetch = async (path, namespace, token) => {
  const service = useBattlenetService()
  return await service.fetch(path, namespace, token)
}

export const $blizzardFetch = blizzardFetch.bind(undefined) as $BlizzardFetch
$blizzardFetch.static = (path, token) => blizzardFetch(path, 'static', token)
$blizzardFetch.dynamic = (path, token) => blizzardFetch(path, 'dynamic', token)
$blizzardFetch.profile = (path, token) => blizzardFetch(path, 'profile', token)
