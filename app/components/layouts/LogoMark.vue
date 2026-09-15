<script setup lang="ts">
const props = defineProps<{ light?: boolean }>()
</script>

<template>
  <svg
    viewBox="0 0 40 28"
    aria-hidden="true"
    class="w-[34px] h-6 flex-none"
    :class="props.light ? 'text-teal-pale' : 'text-teal'"
  >
    <path d="M2 20 Q10 8 20 20 Q30 32 38 20" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
    <path d="M2 12 Q10 2 20 12 Q30 22 38 12" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" opacity="0.55" />
  </svg>
</template>