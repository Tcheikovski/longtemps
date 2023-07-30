<template>
  <NuxtLink v-slot="{ href, navigate, isExactActive }" :to="to" custom>
    <li>
      <a
        role="menuitem"
        :href="href"
        :aria-current="isExactActive ? 'page' : 'false'"
        class="h-full flex items-center p-2 sm:p-4 aria-[current=false]:hover:bg-primary-900 aria-[current=page]:bg-primary-600"
        @click="navigate"
      >
        <span>
          <slot />
        </span>
      </a>
    </li>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { RouteLocationRaw } from "#vue-router";

defineProps<{
  to: RouteLocationRaw;
}>();
</script>
