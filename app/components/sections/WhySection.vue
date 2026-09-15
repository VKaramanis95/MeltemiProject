<script setup lang="ts">
const { t, tm } = useI18n()

type WhyItem = { title: string; desc: string }

const items = computed<WhyItem[]>(() =>
  [0, 1, 2].map((i) => ({
    title: t(`why.items.${i}.title`),
    desc: t(`why.items.${i}.desc`),
  }))
)

const iconNames = ['shield-check', 'plane', 'bell'] as const
</script>

<template>
  <section id="why" class="bg-surface-2/40">
    <div class="wrap">
      <SectionHead :eyebrow="t('why.eyebrow')" :title="t('why.title')" center />

      <div class="grid grid-cols-1 min-[700px]:grid-cols-3 gap-10 min-[700px]:gap-0 mt-4">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="px-6 min-[700px]:border-l min-[700px]:first:border-l-0 border-line"
        >
          <FeatureCard :icon="iconNames[i]" :title="item.title" :desc="item.desc" />
        </div>
      </div>
    </div>
  </section>
</template>