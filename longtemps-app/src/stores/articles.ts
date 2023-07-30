import { Article } from "@/api";

export const useArticlesStore = defineStore("articles", () => {
  const {
    state: collection,
    error: collectionError,
    isLoading: isCollectionLoading,
    isReady: isCollectionReady,
  } = useAsyncState(
    () =>
      $fetch("/api/articles", {
        parseResponse: (response) => {
          const data: Article[] = JSON.parse(response);
          return data.map((data) => {
            data.createdAt = new Date(data.createdAt);
            return data;
          });
        },
      }),
    []
  );

  return { collection, collectionError, isCollectionLoading, isCollectionReady };
});
