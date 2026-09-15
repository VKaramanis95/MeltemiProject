<script setup lang="ts">
defineProps<{ locale: string }>()
</script>

<template>
  <svg
    v-if="locale === 'el'"
    viewBox="0 0 30 20"
    aria-hidden="true"
    class="w-5 h-[14px] block rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
  >
    <rect width="30" height="20" fill="#0d5eaf" />
    <rect y="2.22" width="30" height="2.22" fill="#fff" />
    <rect y="6.67" width="30" height="2.22" fill="#fff" />
    <rect y="11.11" width="30" height="2.22" fill="#fff" />
    <rect y="15.56" width="30" height="2.22" fill="#fff" />
    <rect width="11.11" height="11.11" fill="#0d5eaf" />
    <rect x="4.45" width="2.22" height="11.11" fill="#fff" />
    <rect y="4.45" width="11.11" height="2.22" fill="#fff" />
  </svg>
  <svg
    v-else
    viewBox="0 0 30 20"
    aria-hidden="true"
    class="w-5 h-[14px] block rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
  >
    <rect width="30" height="20" fill="#00247d" />
    <line x1="0" y1="0" x2="30" y2="20" stroke="#fff" stroke-width="4" />
    <line x1="30" y1="0" x2="0" y2="20" stroke="#fff" stroke-width="4" />
    <line x1="0" y1="0" x2="30" y2="20" stroke="#cf142b" stroke-width="1.6" />
    <line x1="30" y1="0" x2="0" y2="20" stroke="#cf142b" stroke-width="1.6" />
    <rect x="12" width="6" height="20" fill="#fff" />
    <rect y="7" width="30" height="6" fill="#fff" />
    <rect x="13.2" width="3.6" height="20" fill="#cf142b" />
    <rect y="8.2" width="30" height="3.6" fill="#cf142b" />
  </svg>
</template>