<script setup lang="ts">

defineProps<{
  question: string
  answer: string
}>()

const open = ref(false)
</script>

<template>
  <div class="border-b border-line">
    <AppButton
      variant="bare"
      type="button"
      class="w-full justify-between gap-4 py-5 text-left"
      icon-right="chevron-down"
      icon-size="18"
      icon-stroke="2"
      :icon-class="open
        ? 'flex-none text-ink-soft transition-transform duration-200 rotate-180'
        : 'flex-none text-ink-soft transition-transform duration-200'"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="font-semibold text-[0.95rem] text-ink">{{ question }}</span>
    </AppButton>

    <div
      class="grid transition-[grid-template-rows] duration-200 ease-out"
      :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <p class="pb-5 pr-8 text-ink-soft text-[0.88rem] leading-relaxed">{{ answer }}</p>
      </div>
    </div>
  </div>
</template>