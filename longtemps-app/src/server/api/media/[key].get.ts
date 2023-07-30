interface MediaPayload {
  _links: { self: { href: string } };
  id: number;
  assets: {
    key: string;
    value: string;
    file_data_id: number;
  }[];
}

const getMedia = cachedFunction(
  async (href: string, token: string) => {
    return await $fetch<MediaPayload>(href, { headers: { authorization: `Bearer ${token}` } });
  },
  {
    maxAge: 60 * 60,
    name: "wowClass",
    getKey: (id: number) => id.toString(),
  }
);

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, "key") as string;
  const token = await getBlizzardToken(event);
  return getMedia(decodeURIComponent(key), token);
});
