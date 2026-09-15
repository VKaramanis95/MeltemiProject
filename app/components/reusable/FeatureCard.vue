<script setup lang="ts">

withDefaults(
  defineProps<{
    icon?: string
    title: string
    desc: string
    iconSize?: string
    iconStroke?: string
  }>(),
  {
    icon: undefined,
    iconSize: '24',
    iconStroke: '1.6',
  }
)
</script>

<template>
  <div class="text-center">
    <span class="flex items-center justify-center w-14 h-14 mx-auto rounded-full border-2 border-teal text-teal-ink">
      <Icon :name="icon" :size="iconSize" :stroke="iconStroke" />
    </span>
    <p class="mt-5 text-[1.05rem] font-bold text-ink">{{ title }}</p>
    <p class="mt-2 text-ink-soft text-[0.92rem] leading-relaxed max-w-[30ch] mx-auto">{{ desc }}</p>
  </div>
</template>