export const useCharacterStore = defineStore("character", () => {
  const {
    collection,
    useItem: useCharacter,
    useItemAsync: useCharacterAsync,
  } = useAsyncCollection((realmSlug, characterName) => $fetch(`/api/character/${realmSlug}/${characterName}`));

  const {
    collection: mediaCollection,
    useItem: useMedia,
    useItemAsync: useMediaAsync,
  } = useAsyncCollection((realmSlug, characterName) =>
    $fetch(`/api/character/${realmSlug}/${characterName}/character-media`)
  );

  return { collection, mediaCollection, useCharacter, useCharacterAsync, useMedia, useMediaAsync };
});
