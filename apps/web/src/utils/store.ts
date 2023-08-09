import { type UnwrapNestedRefs } from 'vue'
import { type UseAsyncStateReturnBase } from '@vueuse/core'
import { type StoreDefinition } from 'pinia'
import { Pinia } from '@pinia/nuxt/dist/runtime/composables'

type ResourceData<T> = Omit<UseAsyncStateReturnBase<T | null, any[], true>, 'execute'>
type ResourceCollectionData<T> = Record<string, UnwrapNestedRefs<ResourceData<T>>>

type ResourceState<T> = {
  resource: ResourceData<T>
}

type ResourceGetters = {}

type ResourceActions<T> = {
  getItem: () => ResourceData<T>
}

type ResourceCollectionState<T> = {
  collection: ResourceCollectionData<T>
}

type ResourceCollectionGetters = {}

type ResourceCollectionActions<T, U extends any[]> = {
  getItem: (...args: U) => ResourceData<T>
}

interface ResourceCollectionOptions<U extends any[]> {
  getKey?: (...args: U) => string
}

type ResourceStoreDefinition<
  Id extends string,
  T,
> = StoreDefinition<Id, ResourceState<T>, ResourceGetters, ResourceActions<T>>

type ResourceCollectionStoreDefinition<
  Id extends string,
  T,
  U extends any[]
> = StoreDefinition<Id, ResourceCollectionState<T>, ResourceCollectionGetters, ResourceCollectionActions<T, U>>

export const defineResourceStore = <
  Id extends string,
  T
>(name: Id, fn: () => Promise<T>): ResourceStoreDefinition<Id, T> => {
  return defineStore<Id, ResourceState<T>, ResourceGetters, ResourceActions<T>>(name, {
    state: () => {
      const { state, isReady, isLoading, error } = useAsyncState(() => fn(), null, {
        immediate: true,
        shallow: true
      })

      return { resource: { state, isReady, isLoading, error } }
    },

    actions: {
      getItem () {
        return toRefs(this.resource)
      }
    }
  })
}

export const defineResourceCollectionStore = <
  Id extends string,
  T,
  U extends any[]
>(name: Id, fn: (...args: U) => Promise<T>, options: ResourceCollectionOptions<U> = {}): ResourceCollectionStoreDefinition<Id, T, U> => {
  const {
    getKey = (...args) => args.map(arg => `${arg}`).join('_')
  } = options

  return defineStore<Id, ResourceCollectionState<T>, ResourceCollectionGetters, ResourceCollectionActions<T, U>>(name, {
    state: () => ({
      collection: {}
    }),

    actions: {
      getItem (...args) {
        const key = getKey(...args)
        if (this.collection[key]) { return toRefs(this.collection[key]) }

        const { state, isReady, isLoading, error } = useAsyncState(() => fn(...args), null, {
          immediate: true,
          shallow: true,
          throwError: true
        })

        const item = { state, isReady, isLoading, error }
        this.collection[key] = reactive(item)

        return item
      }
    }
  })
}

export const resourceStoreToComposables = <Id extends string, T>(useStore: ResourceStoreDefinition<Id, T>) => {
  const useItem = (pinia?: Pinia) => {
    const store = useStore(pinia)
    return store.getItem()
  }

  const useItemAsync = (pinia?: Pinia) => {
    const { state, isReady, isLoading, error } = useItem(pinia)
    const shell: ResourceData<T> = { state, isReady, isLoading, error }
    const promiseHandle: PromiseLike<ResourceData<T>> = {
      then: (onfulfilled, onrejected) => {
        return until(isLoading).toBe(false).then(() => shell).then(onfulfilled, onrejected)
      }
    }

    return Object.assign({}, shell, promiseHandle)
  }

  return makeDestructurable({ useItem, useItemAsync } as const, [useItem, useItemAsync] as const)
}

export const resourceCollectionStoreToComposables = <Id extends string, T, U extends any[]>(useStore: ResourceCollectionStoreDefinition<Id, T, U>) => {
  const useItem = (pinia?: Pinia, ...args: { [index in keyof U]: MaybeRefOrGetter<U[index]> }) => {
    const store = useStore(pinia)
    return store.getItem(...args.map(val => toValue(val)) as U)
  }

  const useItemAsync = (pinia?: Pinia, ...args: { [index in keyof U]: MaybeRefOrGetter<U[index]> }) => {
    const { state, isReady, isLoading, error } = useItem(pinia, ...args)
    const shell: ResourceData<T> = { state, isReady, isLoading, error }
    const promiseHandle: PromiseLike<ResourceData<T>> = {
      then: (onfulfilled, onrejected) => {
        return until(isLoading).toBe(false).then(() => shell).then(onfulfilled, onrejected)
      }
    }

    return Object.assign({}, shell, promiseHandle)
  }

  return makeDestructurable({ useItem, useItemAsync } as const, [useItem, useItemAsync] as const)
}
