<template>
  <div class="h-full w-full flex justify-center text-center">
    <div class="container mx-auto my-32 max-w-xl">
      <i18n-t tag="p" keypath="messages.welcome" class="text-4xl">
        <template #name>
          <strong>{{ name }}</strong>
        </template>
      </i18n-t>

      <div v-if="status !== 'authenticated'" class="mt-8">
        <button class="btn btn-primary btn-lg font-bold" :disabled="status === 'loading'" @click="onSignin">
          {{ t("messages.signin") }}
        </button>
      </div>

      <div v-else-if="userCharacters" class="mt-2">
        <i18n-t tag="p" keypath="messages.characters" :plural="userCharacters.length" class="mb-2">
          <template #character>
            <strong>{{ t("character", userCharacters.length) }}</strong>
          </template>
        </i18n-t>
        <ul class="flex flex-wrap justify-center gap-1">
          <li
            v-for="character in userCharacters"
            :key="character.id"
            class="b after:content-[','] last:after:content-none"
          >
            {{ character.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useGuildStore();
const { data: auth, status, signIn } = useAuth();
const { roster, isRosterReady } = storeToRefs(store);
const { t } = useI18n();

await until(status)
  .not.toBe("loading")
  .then(() => (status.value === "authenticated" ? until(isRosterReady).toBe(true) : Promise.resolve(true)));

const username = useAuthUsername();
const name = computed(() => useUpperFirst(username.value?.name) || t("guest"));

const onSignin = () => signIn("keycloak").then<void>();

const userCharacters = computed(() => {
  const userCharacters = auth.value?.user?.profile.characters ?? [];
  return roster.value?.members
    .filter(({ character }) => userCharacters.some(({ id }) => character.id === id))
    .sort(({ rank: a }, { rank: b }) => a - b)
    .map(({ character }) => character);
});
</script>

<i18n lang="json">
{
  "fr_FR": {
    "messages": {
      "welcome": "Bienvenue, {name}\u00A0!",
      "characters": "Vous n'avez {character} dans la guilde. | Vous avez {character} dans la guilde\u00A0: | Vous avez {character} dans la guilde\u00A0:",
      "signin": "Connectez-vous avec votre compte Battle.net"
    },
    "guest": "voyageur",
    "character": "aucun personnage | un personnage | {n} personnages"
  },
  "en_US": {
    "messages": {
      "welcome": "Welcome, {name}!",
      "characters": "You have {character} in the guild. | You have {character} in the guild: | You have {character} in the guild:",
      "signin": "Signin in with your Battle.net account"
    },
    "guest": "wanderer",
    "character": "no character | one character | {n} characters"
  },
  "de_DE": {
    "messages": {
      "welcome": "Willkommen, {name}\u00A0!",
      "characters": "Du hast {character} in der Gilde. | Du hast {character} in der Gilde\u00A0: | Du hast {character} in der Gilde\u00A0:",
      "signin": "Melden Sie sich mit Ihrem Battle.net-Account an"
    },
    "guest": "Reisender",
    "character": "keine Charaktere | einen Charakter | {n} Charaktere"
  }
}
</i18n>
