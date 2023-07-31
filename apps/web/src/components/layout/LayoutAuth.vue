<template>
  <div>
    <button
      class="p-2 rounded-full text-neutral-200/50 hover:text-[#148eff] hover:bg-primary-600/50"
      :aria-controls="active ? 'auth-menu' : undefined"
      :aria-expanded="active ? 'true' : 'false'"
      aria-haspopup="true"
      @click="toggle()"
    >
      <span id="auth-menu-label" class="sr-only">{{ t("title") }}</span>
      <Icon name="simple-icons:battledotnet" class="" size="24" />
    </button>
    <ClientOnly>
      <Teleport to="body">
        <ul
          v-if="active"
          id="auth-menu"
          ref="menu"
          role="menu"
          class="absolute z-20 text-white bg-neutral-700 px-4 py-2 mt-2 flex flex-col gap-y-2 rounded-md"
          aria-labelledby="auth-menu-label"
          :aria-hidden="active ? 'false' : 'true'"
          :style="positionStyle"
        >
          <template v-if="status === 'unauthenticated'">
            <li role="menuitem" class="-mx-4">
              <button type="button" class="w-full px-4 py-2 hover:bg-primary-600" @click="onSignin">
                {{ t("signin") }}
              </button>
            </li>
          </template>

          <template v-if="status === 'authenticated'">
            <li role="presentation">
              <div v-if="username" role="heading" class="flex gap-x-1 items-baseline">
                <span class="text-lg font-bold">{{ useUpperFirst(username.name) }}</span>
                <span class="text-neutral-300">#{{ username.tag }}</span>
              </div>
              <div class="text-sm text-neutral-300">
                {{ email }}
              </div>
            </li>

            <li role="presentation" class="-mx-4">
              <button role="menuitem" type="button" class="w-full px-4 py-2 hover:bg-primary-600" @click="onSignout">
                {{ t("signout") }}
              </button>
            </li>
          </template>
        </ul>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()

const { data, status, signIn, signOut } = useAuth()
const { t } = useI18n()

const active = ref(false)
const username = useAuthUsername()
const email = computed(() => data.value?.user?.email)
const toggle = () => (active.value = !active.value)

const onSignin = () => {
  signIn('keycloak')
}

const onSignout = () => {
  signOut({ callbackUrl: localePath({ name: 'index' }) })
}

const element: Ref<HTMLElement> = useCurrentElement()
const menu: Ref<HTMLElement | null> = ref(null)

const { width } = useWindowSize()
const { bottom, right } = useElementBounding(element)
const positionStyle = computed(() => ({ top: `${bottom.value}px`, right: `${width.value - right.value}px` }))

onClickOutside(
  menu,
  () => {
    active.value = false
  },
  { ignore: [element] }
)
</script>

<i18n lang="json">
{
  "fr_FR": {
    "title": "Profil",
    "signin": "Se connecter",
    "signout": "Se déconnecter"
  },
  "en_US": {
    "title": "Profile",
    "signin": "Sign in",
    "signout": "Sign out"
  },
  "de_DE": {
    "signin": "Einloggen",
    "signout": "Abmelden"
  }
}
</i18n>
