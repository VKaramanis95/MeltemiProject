<script setup lang="ts">
const { tm, rt } = useI18n()


const badges = computed(() => (tm('hero.badges') as unknown[]).map((b) => rt(b as never)))

const badgeIconNames = ['plane', 'shield-check', 'bell', 'users'] as const
</script>

<template>
  <ul class="flex flex-wrap gap-x-6 gap-y-3 list-none p-0 m-0">
    <li
      v-for="(badge, i) in badges"
      :key="i"
      class="flex items-center gap-2 text-white text-[0.82rem] font-medium whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
    >
      <IconLabel :icon="badgeIconNames[i]" icon-class="flex-none text-teal-pale">{{ badge }}</IconLabel>
    </li>
  </ul>
</template>