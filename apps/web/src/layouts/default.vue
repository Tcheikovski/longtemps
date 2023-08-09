<template>
  <div class="h-screen w-screen flex flex-col relative bg-neutral-950 text-white">
    <LayoutHeader class="flex-0" />

    <div
      id="page"
      class="flex-1 relative overflow-auto scrollbar-thin scrollbar-track-neutral-700 scrollbar-corner-neutral-700 scrollbar-thumb-neutral-500"
    >
      <div class="min-h-full flex flex-col">
        <div class="flex-1 flex">
          <main class="min-h-full w-full">
            <LayoutBanner />
            <slot />
          </main>
        </div>
      </div>
    </div>

    <div v-if="false" class="fixed inset-0" />
  </div>
</template>
