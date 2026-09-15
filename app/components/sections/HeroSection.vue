<script setup lang="ts">
const { t, tm, rt } = useI18n()


const heroTrust = computed(() => (tm('hero.trust') as unknown[]).map((item) => rt(item as never)))

const trustIconNames = ['star', 'car', 'award'] as const
</script>

<template>
  <section class="relative overflow-hidden text-white bg-navy-deep">
    <img
      src="/images/hero-kos.webp"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 w-full h-full object-cover"
      fetchpriority="high"
    />

    <div
      class="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/55 to-navy-deep/10"
      aria-hidden="true"
    />
  
    <div
      class="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-transparent"
      aria-hidden="true"
    />

    <div class="wrap relative py-10 min-[900px]:py-16">
      <div class="flex flex-col min-[900px]:flex-row min-[900px]:items-start gap-10 min-[900px]:gap-10">
        <!-- copy column -->
        <div class="flex-1 min-w-0 min-[900px]:max-w-[54%]">
          <p class="eyebrow text-teal-pale">{{ t('hero.eyebrow') }}</p>

          <h1 class="text-[1.85rem] min-[700px]:text-[2.5rem] mt-3 max-w-[19ch] leading-[1.15] text-white">
            {{ t('hero.titleLine1') }} {{ t('hero.titleLine2') }} {{ t('hero.titleLine3') }}
          </h1>

          <p
            class="text-white/90 text-[1rem] max-w-[46ch] mt-4 leading-relaxed normal-case font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
          >
            {{ t('hero.lede') }}
          </p>

          <div class="mt-7">
            <AppButton href="#cars" class="shadow-lg shadow-black/20">{{ t('hero.ctaPrimary') }}</AppButton>
          </div>

          <div class="mt-9">
            <HeroBadges />
          </div>
        </div>

       
        <div class="hidden min-[900px]:block min-[900px]:w-[360px] min-[900px]:flex-none min-[900px]:ml-auto">
          <HeroBookingCard />
        </div>
      </div>

    
      <ul
        class="flex flex-wrap gap-2 mt-6 min-[900px]:mt-0 min-[900px]:absolute min-[900px]:bottom-0 min-[900px]:right-0 min-[900px]:justify-end list-none p-0 m-0 text-[0.78rem] font-medium text-white"
      >
        <li
          v-for="(item, i) in heroTrust"
          :key="i"
          class="flex items-center gap-[6px] bg-navy-deep/55 backdrop-blur-sm border border-white/15 rounded-full px-3 py-[6px] whitespace-nowrap"
        >
          <IconLabel :icon="trustIconNames[i]" size="15" icon-class="flex-none text-teal-pale">
            <span v-html="item" />
          </IconLabel>
        </li>
      </ul>
    </div>
  </section>
</template>