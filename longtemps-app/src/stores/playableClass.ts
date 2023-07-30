export const usePlayableClassStore = defineStore("playableClass", () => {
  const { collection, useItem: usePlayableClass } = useAsyncCollection((id) => $fetch(`/api/playable-class/${id}`));
  return { collection, usePlayableClass };
});
