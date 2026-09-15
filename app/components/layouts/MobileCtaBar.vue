<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="fixed left-0 right-0 bottom-0 z-50 flex gap-px bg-line border-t border-line min-[900px]:hidden">
    <a :href="`tel:${t('site.phoneHref')}`" class="flex-1 text-center py-[14px] px-2 font-bold text-[0.9rem] no-underline bg-navy text-white">
      📞 {{ t('mobilebar.call') }}
    </a>
    <a href="#book" class="flex-1 text-center py-[14px] px-2 font-bold text-[0.9rem] no-underline bg-gold text-[#2a1c04]">
      {{ t('mobilebar.book') }}
    </a>
  </div>
</template>