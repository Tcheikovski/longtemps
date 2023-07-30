interface Username {
  name: string;
  tag?: string;
}

interface UseUsername {
  (username: MaybeRefOrGetter<string>): ComputedRef<Username>;
  (username?: MaybeRefOrGetter<string | undefined | null>): ComputedRef<Username | null>;
}

export const getUsername = (username?: string | null): Username | null => {
  if (!username) return null;
  const result = username.split("#");
  return { name: useUpperFirst(result.at(0)), tag: result.at(1) };
};

export const useUsername = reactify(getUsername) as UseUsername;
