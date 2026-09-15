<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
const localePath = useLocalePath()
const homeAnchor = (id: string) => `${localePath('/')}#${id}`
</script>

<template>
  <footer id="location" class="bg-navy-deep text-footer-text text-[0.86rem]">
    <div class="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-[18px] p-[30px_30px_22px]">
      <div class="flex items-center">
        <span class="flex flex-col items-start leading-[0.9]">
          <strong class="font-script font-bold text-[2.1rem] leading-none text-white">Meltemi</strong>
          <small class="text-[0.6rem] font-bold tracking-[0.24em] text-footer-text-dim mt-[3px]">{{ t('site.rentalsWord') }}</small>
        </span>
      </div>

      <nav class="flex flex-wrap gap-x-6 gap-y-[10px]" :aria-label="t('nav.ariaLabel')">
        <a :href="homeAnchor('why')" class="no-underline text-footer-link font-semibold text-[0.88rem] whitespace-nowrap hover:text-white">{{ t('nav.why') }}</a>
        <a :href="homeAnchor('cars')" class="no-underline text-footer-link font-semibold text-[0.88rem] whitespace-nowrap hover:text-white">{{ t('nav.cars') }}</a>
        <a :href="homeAnchor('book')" class="no-underline text-footer-link font-semibold text-[0.88rem] whitespace-nowrap hover:text-white">{{ t('nav.contact') }}</a>
        <NuxtLinkLocale to="/faq" class="no-underline text-footer-link font-semibold text-[0.88rem] whitespace-nowrap hover:text-white">{{ t('nav.faq') }}</NuxtLinkLocale>
      </nav>

      <div class="flex flex-wrap gap-x-[22px] gap-y-[10px]">
        <a :href="`tel:${t('site.phoneHref')}`" class="flex items-center gap-[7px] no-underline text-footer-text whitespace-nowrap hover:text-white">
          <svg viewBox="0 0 20 20" aria-hidden="true" class="w-[15px] h-[15px] flex-none opacity-[0.85]"><path d="M4.5 3h2.8l1 3.6-1.7 1.4a10 10 0 0 0 4.4 4.4l1.4-1.7 3.6 1v2.8c0 .8-.7 1.4-1.5 1.3C8.7 15.2 4.8 11.3 4.2 6.5A1.4 1.4 0 0 1 4.5 3Z" fill="currentColor"/></svg>
          {{ t('site.phoneDisplay') }}
        </a>
        <a :href="`mailto:${t('site.email')}`" class="flex items-center gap-[7px] no-underline text-footer-text whitespace-nowrap hover:text-white">
          <svg viewBox="0 0 20 20" aria-hidden="true" class="w-[15px] h-[15px] flex-none opacity-[0.85]"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h11A1.5 1.5 0 0 1 17 5.5v9A1.5 1.5 0 0 1 15.5 16h-11A1.5 1.5 0 0 1 3 14.5v-9Zm1.6.2 5.15 3.6a.5.5 0 0 0 .5 0l5.15-3.6" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>
          {{ t('site.email') }}
        </a>
        <span class="flex items-center gap-[7px] text-footer-text whitespace-nowrap">
          <svg viewBox="0 0 20 20" aria-hidden="true" class="w-[15px] h-[15px] flex-none opacity-[0.85]"><path d="M10 2c-3 0-5.5 2.4-5.5 5.5C4.5 11.5 10 18 10 18s5.5-6.5 5.5-10.5C15.5 4.4 13 2 10 2Zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" fill="currentColor"/></svg>
          {{ t('site.address') }}
        </span>
      </div>
    </div>

    <div class="wrap flex flex-wrap items-center justify-between gap-x-5 gap-y-[10px] p-[16px_30px_22px] border-t border-footer-border">
      <p class="m-0 text-footer-muted text-[0.78rem] whitespace-nowrap">{{ t('footer.copyright', { name: t('site.name'), year }) }}</p>
      <div class="flex gap-[10px]">
        <a href="#" aria-label="Facebook" class="flex text-footer-text hover:text-white">
          <svg viewBox="0 0 20 20" aria-hidden="true" class="w-[18px] h-[18px]"><path d="M12.5 4h-1.6C9.1 4 8 5.2 8 6.9V9H6.3v2.5H8V17h2.6v-5.5h1.9l.4-2.5h-2.3V7.2c0-.6.3-1 1.1-1h1.3V4Z" fill="currentColor"/></svg>
        </a>
        <a href="#" aria-label="Instagram" class="flex text-footer-text hover:text-white">
          <svg viewBox="0 0 20 20" aria-hidden="true" class="w-[18px] h-[18px]"><rect x="3" y="3" width="14" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="10" cy="10" r="3.2" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="14" cy="6" r="0.9" fill="currentColor"/></svg>
        </a>
      </div>
    </div>
  </footer>
</template>