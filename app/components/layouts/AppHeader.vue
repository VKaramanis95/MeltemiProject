<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()

const otherLocales = computed(() =>
  (locales.value as { code: string; name?: string }[]).filter((l) => l.code !== locale.value)
)


const localePath = useLocalePath()
const homeAnchor = (id: string) => `${localePath('/')}#${id}`
</script>

<template>

  <header class="hidden min-[900px]:block sticky top-0 z-40 bg-surface border-b border-line">
    <div class="wrap flex items-center gap-5 py-[14px]">
      <NuxtLink to="/" class="flex items-center gap-[10px] no-underline text-navy-deep mr-auto">
        <LogoMark />
        <span class="flex flex-col leading-[1.05]">
          <strong class="font-display font-extrabold text-[1.3rem] normal-case">Meltemi</strong>
          <small class="text-[0.6rem] font-bold tracking-[0.18em] text-ink-soft">{{ t('site.rentalsWord') }}</small>
        </span>
      </NuxtLink>

      <nav class="flex gap-7" :aria-label="t('nav.ariaLabel')">
        <a :href="homeAnchor('why')" class="no-underline text-ink-soft text-[0.92rem] font-semibold hover:text-navy-deep">{{ t('nav.why') }}</a>
        <a :href="homeAnchor('cars')" class="no-underline text-ink-soft text-[0.92rem] font-semibold hover:text-navy-deep">{{ t('nav.cars') }}</a>
        <a :href="homeAnchor('book')" class="no-underline text-ink-soft text-[0.92rem] font-semibold hover:text-navy-deep">{{ t('nav.contact') }}</a>
        <NuxtLinkLocale to="/faq" class="no-underline text-ink-soft text-[0.92rem] font-semibold hover:text-navy-deep">{{ t('nav.faq') }}</NuxtLinkLocale>
      </nav>

      <div class="flex items-center gap-4">
        <span class="flex items-center gap-[6px] text-[0.85rem] font-semibold text-ink-soft whitespace-nowrap">
          <svg viewBox="0 0 20 20" aria-hidden="true" class="w-4 h-4 flex-none"><path d="M10 2c-3 0-5.5 2.4-5.5 5.5C4.5 11.5 10 18 10 18s5.5-6.5 5.5-10.5C15.5 4.4 13 2 10 2Zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" fill="currentColor"/></svg>
          {{ t('site.city') }}
        </span>
        <a
          class="flex items-center gap-[6px] text-[0.85rem] font-semibold text-navy-deep no-underline whitespace-nowrap hover:text-teal-ink"
          :href="`tel:${t('site.phoneHref')}`"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" class="w-4 h-4 flex-none"><path d="M4.5 3h2.8l1 3.6-1.7 1.4a10 10 0 0 0 4.4 4.4l1.4-1.7 3.6 1v2.8c0 .8-.7 1.4-1.5 1.3C8.7 15.2 4.8 11.3 4.2 6.5A1.4 1.4 0 0 1 4.5 3Z" fill="currentColor"/></svg>
          {{ t('site.phoneDisplay') }}
        </a>
        <AppButton
          v-for="l in otherLocales"
          :key="l.code"
          variant="bare"
          type="button"
          class="rounded-[2px] opacity-[0.85] transition duration-150 hover:opacity-100 hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2"
          :aria-label="`Switch to ${l.name}`"
          :title="l.name"
          @click="setLocale(l.code as 'el' | 'en')"
        >
          <FlagIcon :locale="l.code" />
        </AppButton>
      </div>
    </div>
  </header>
</template>