<script setup lang="ts">

withDefaults(
  defineProps<{
    name: string
    text: string
    rating?: number
  }>(),
  { rating: 5 }
)
</script>

<template>
  <div class="bg-white rounded-2xl border border-line p-6 flex flex-col">
    <div class="flex items-center gap-0.5">
      <Icon
        v-for="i in 5"
        :key="i"
        name="star"
        size="15"
        stroke="1.8"
        :fill="i <= rating ? 'currentColor' : 'none'"
        :class="i <= rating ? 'text-gold' : 'text-line'"
      />
    </div>

    <p class="mt-4 text-ink-soft text-[0.9rem] italic leading-relaxed flex-1">{{ text }}</p>

    <div class="flex items-center gap-2.5 mt-5 pt-4 border-t border-line">
      <span class="flex items-center justify-center w-9 h-9 rounded-full bg-teal/10 text-teal-ink flex-none">
        <Icon name="user" size="16" stroke="1.8" />
      </span>
      <span class="font-semibold text-[0.88rem] text-ink">{{ name }}</span>
    </div>
  </div>
</template>