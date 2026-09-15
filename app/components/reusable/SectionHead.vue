<script setup lang="ts">

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    intro?: string
    center?: boolean
    maxWidth?: string 
  }>(),
  {
    intro: undefined,
    center: false,
    maxWidth: undefined,
  }
)
</script>

<template>
  <div class="section-head" :class="{ 'text-center mx-auto': center }" :style="center && maxWidth ? { maxWidth } : undefined">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="intro" class="mt-3 text-ink-soft text-[0.95rem] leading-relaxed">
      <slot>{{ intro }}</slot>
    </p>
  </div>
</template>