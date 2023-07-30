import { UnwrapNestedRefs } from "vue";

interface ItemState<T> {
  state: Ref<T | null>;
  isReady: Ref<boolean>;
  isLoading: Ref<boolean>;
  error: Ref<unknown>;
}

type CollectionState<T> = {
  [key in string]?: UnwrapNestedRefs<ItemState<T>>;
};

export const useAsyncCollection = <T, Params extends string[]>(fn: (...params: Params) => Promise<T>) => {
  const collection = reactive<CollectionState<T>>({});

  const useItem = (...params: Params): ItemState<T> => {
    const key = params.join("-");
    let itemState = collection[key];
    if (!itemState) {
      const { state, isLoading, isReady, error } = useAsyncState<T | null>(() => fn(...params), null);
      itemState = reactive({ state, error, isLoading, isReady });
      collection[key] = itemState;
    }

    return toRefs(itemState);
  };

  const useItemAsync = (...params: Params): ItemState<T> & PromiseLike<ItemState<T>> => {
    const item = useItem(...params);
    const init = () => Promise.race([until(item.isReady).toBe(true), until(item.error).toBeTruthy()]);
    return {
      ...item,
      then: (onfulfilled, onrejected) =>
        init()
          .then(() => item)
          .then(onfulfilled, onrejected),
    };
  };

  return { collection, useItem, useItemAsync };
};
