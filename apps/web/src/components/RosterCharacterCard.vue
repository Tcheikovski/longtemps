<template>
  <div
    class="flex gap-x-4 items-start p-2 shadow-sm border rounded border-neutral-600 bg-neutral-800 text-white"
    :class="{ 'ring-1 ring-amber-300': isOwned, 'opacity-50 bg-red-600/20': characterError }"
  >
    <div
      class="rounded-full overflow-hidden ring-2 ring-neutral-500 ring-offset-2 ring-offset-black"
      :class="{
        '!ring-primary-700': characterData?.faction.type === 'ALLIANCE',
        '!ring-red-700': characterData?.faction.type === 'HORDE',
      }"
    >
      <Suspense>
        <CharacterAvatar :character="character.name" :realm="character.realm.slug" :race="character.playable_race.id" :gender="gender?.type" />
        <template #fallback>
          <img
            class="h-16 w-16 bg-black"
            src="https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg"
          >
        </template>
      </Suspense>
    </div>

    <div class="flex flex-col flex-1">
      <h3 class="text-lg font-bold flex gap-x-2 items-baseline">
        <span>{{ name }}</span>
        <div class="text-sm font-light text-neutral-400 flex gap-x-1">
          <span>{{ level }}</span>
          <template v-if="realmName">
            <span>|</span>
            <TranslatableWord :value="realmName" />
          </template>
        </div>
      </h3>
      <div class="flex items-baseline gap-x-1">
        <Suspense>
          <PlayableRace :id="character.playable_race.id" :gender="gender?.type" />
        </Suspense>
        <Suspense>
          <PlayableClass :id="character.playable_class.id" :gender="gender?.type" />
        </Suspense>
        <Suspense v-if="characterData">
          <PlayableSpecialization :id="characterData.active_spec.id" />
        </Suspense>
      </div>
    </div>

    <div v-if="rank" class="flex-none">
      {{ rank }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Character, Locale, PlayableClass, PlayableRace } from '@longtemps/blizzard'

interface CharacterProps extends Pick<Character, 'id' | 'name' | 'realm' | 'level' | 'gender'> {
  playable_class: Pick<PlayableClass, 'id'>;
  playable_race: Pick<PlayableRace, 'id'>;
}

const props = defineProps<{
  character: CharacterProps;
  rank?: number;
}>()

const character = toRef(props, 'character')
const store = useCharacterStore()
const { t, locale } = useI18n<undefined, Locale>()
const { state: characterData, error: characterError } = await store.useCharacterAsync(
  character.value.realm.slug,
  character.value.name.toLowerCase()
)

const gender = computed(() => characterData.value?.gender ?? null)
const realmName = computed(() => characterData.value?.realm.name ?? null)

const level = computed(() => characterData.value?.level ?? props.character.level)
const name = computed(() => {
  if (characterData.value) {
    const name = characterData.value.name
    const title =
      characterData.value.active_title &&
      getTranslatedValue(characterData.value.active_title?.display_string, locale.value)
    return title ? title.replace('{name}', name) : name
  }

  return props.character.name
})

const rank = computed(() => {
  if (typeof props.rank !== 'number') { return null }
  return t(`rank.${props.rank.toString()}`)
})

const isOwned = computed(() => {
  return false
})
</script>

<i18n lang="json">
{
  "fr_FR": {
    "rank": {
      "0": "Boss",
      "1": "Officier",
      "2": "Reroll officier",
      "3": "Membre",
      "4": "Recrue",
      "5": "Reroll",
      "6": "ABS"
    }
  },
  "en_US": {
    "rank": {
      "0": "Boss",
      "1": "Officer",
      "2": "Officer reroll",
      "3": "Member",
      "4": "Recruit",
      "5": "Reroll",
      "6": "AFK"
    }
  },
  "de_DE": {
    "rank": {
      "0": "Boss",
      "1": "Offizier",
      "2": "Offizier Reroll",
      "3": "Mitglied",
      "4": "Rekrut",
      "5": "Reroll",
      "6": "AFK"
    }
  }
}
</i18n>
