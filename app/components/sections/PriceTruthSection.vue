<script setup lang="ts">
const { t, tm, rt } = useI18n()

const goodItems = computed(() => (tm('truth.goodItems') as unknown[]).map((i) => rt(i as never)))
const badItems = computed(() => (tm('truth.badItems') as unknown[]).map((i) => rt(i as never)))
</script>

<template>
  <section id="truth" class="bg-surface-2/40">
    <div class="wrap">
      <SectionHead :eyebrow="t('truth.eyebrow')" :title="t('truth.title')" :intro="t('truth.intro')" center max-width="62ch" />

      <div class="grid grid-cols-1 min-[820px]:grid-cols-2 gap-6 mt-10 items-stretch">
        <ComparisonCard
          :title="t('truth.badTitle')"
          :items="badItems"
          :callout-value="t('truth.calloutBad')"
          :callout-label="t('truth.calloutBadLabel')"
          :per-day-label="t('fleet.perDay')"
        />
        <ComparisonCard
          highlighted
          :title="t('truth.goodTitle')"
          :items="goodItems"
          :callout-value="t('truth.calloutGood')"
          :callout-label="t('truth.calloutGoodLabel')"
          :per-day-label="t('fleet.perDay')"
        />
      </div>

      <div class="relative mt-8 rounded-2xl overflow-hidden">
        <img src="/images/hero-kos.webp" alt="" aria-hidden="true" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/60 to-navy-deep/30" aria-hidden="true" />
        <div class="relative flex flex-col min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between gap-4 p-6 min-[640px]:p-8">
          <p class="text-white text-[1.15rem] font-bold">{{ t('truth.banner.title') }}</p>
          <AppButton href="#book" arrow class="flex-none whitespace-nowrap">{{ t('truth.banner.cta') }}</AppButton>
        </div>
      </div>
    </div>
  </section>
</template>