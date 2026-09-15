<script setup lang="ts">

withDefaults(
  defineProps<{
    title: string
    items: string[]
    calloutValue: string
    calloutLabel: string
    perDayLabel: string
    highlighted?: boolean
  }>(),
  {
    highlighted: false,
  }
)
</script>

<template>
  <div
    class="rounded-2xl p-6 min-[820px]:p-8 flex flex-col"
    :class="highlighted ? 'border-2 border-teal bg-teal/5' : 'border border-line bg-surface'"
  >
    <p class="font-bold text-[1.05rem]" :class="highlighted ? 'text-teal-ink' : 'text-ink'">{{ title }}</p>

    <ul class="mt-5 flex flex-col gap-3 list-none p-0 m-0 flex-1">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="flex items-start gap-2.5 text-[0.88rem] leading-snug"
        :class="highlighted ? 'text-ink' : 'text-ink-soft'"
      >
        <Icon
          :name="highlighted ? 'check' : 'x'"
          size="15"
          :stroke="highlighted ? '2.6' : '2.4'"
          class="flex-none mt-0.5"
          :class="highlighted ? 'text-teal-ink' : 'text-red-500/70'"
        />
        {{ item }}
      </li>
    </ul>

    <div class="mt-6 pt-5 border-t" :class="highlighted ? 'border-teal/25' : 'border-line'">
      <span class="text-[1.6rem] font-extrabold" :class="highlighted ? 'text-navy-deep' : 'text-ink-soft'">{{ calloutValue }}</span>
      <span class="text-[0.8rem] text-ink-soft"> / {{ perDayLabel }}</span>
      <p class="mt-1 text-[0.8rem] text-ink-soft leading-snug">{{ calloutLabel }}</p>
    </div>
  </div>
</template>