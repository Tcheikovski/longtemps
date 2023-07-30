<template>
  <div>
    <button
      class="p-2 rounded-full text-neutral-200/50 hover:text-neutral-200 hover:bg-primary-600/50"
      :aria-controls="active ? 'locale-menu' : undefined"
      :aria-expanded="active ? 'true' : 'false'"
      aria-haspopup="true"
      @click="toggle()"
    >
      <span id="locale-menu-label" class="sr-only">{{ t("title") }}</span>
      <Icon name="ion:earth" size="24" />
    </button>
    <ClientOnly>
      <Teleport to="body">
        <ul
          v-if="active"
          id="locale-menu"
          ref="menu"
          role="menu"
          class="absolute z-20 text-white bg-neutral-700 px-4 py-2 mt-2 flex flex-col rounded-md text-sm"
          aria-labelledby="locale-menu-label"
          :aria-hidden="active ? 'false' : 'true'"
          :style="positionStyle"
        >
          <li v-for="l in elements" :key="l.code" role="presentation" class="-mx-4">
            <NuxtLink v-slot="{ navigate }" custom :to="l.to">
              <button
                class="w-full text-left px-4 py-2 hover:bg-primary-600 disabled:bg-primary-600"
                role="menuitem"
                type="button"
                :disabled="l.code === locale"
                translate="no"
                :lang="l.iso"
                @click="
                  () => {
                    navigate();
                    active = false;
                  }
                "
              >
                {{ l.label }}
              </button>
            </NuxtLink>
          </li>
        </ul>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { LocaleObject } from "@nuxtjs/i18n/dist/runtime/composables";

const { t, locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const active = ref(false);
const toggle = () => (active.value = !active.value);

const element: Ref<HTMLElement> = useCurrentElement();
const menu: Ref<HTMLElement | null> = ref(null);

const { width } = useWindowSize();
const { bottom, right } = useElementBounding(element);
const positionStyle = computed(() => ({ top: `${bottom.value}px`, right: `${width.value - right.value}px` }));

const elements = useArrayMap(locales as Ref<LocaleObject[]>, (l) => {
  const displayNames = new Intl.DisplayNames(l.iso!, { type: "language", style: "long" });
  const titleNames = new Intl.DisplayNames(l.iso!, { type: "language", style: "long" });
  return {
    code: l.code,
    iso: l.iso,
    label: useUpperFirst(displayNames.of(l.iso!)),
    title: useUpperFirst(titleNames.of(l.iso!)),
    to: switchLocalePath(l.code),
  };
});

onClickOutside(
  menu,
  () => {
    active.value = false;
  },
  { ignore: [element] }
);
</script>

<i18n lang="json">
{
  "fr_FR": {
    "title": "Langue"
  },
  "en_US": {
    "title": "Language"
  },
  "de_DE": {}
}
</i18n>
