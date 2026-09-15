<script setup lang="ts">

const { t, locale } = useI18n()
useHead({
  title: computed(() => t('site.name')),
  
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
})
</script>
<template>
	<div class="min-h-screen  flex flex-col pb-16 min-[900px]:pb-0">
		<AppHeader />
		<main class="flex-1">
			<slot />
		</main>
		<AppFooter />
		<MobileCtaBar />
		<LocalizeBotWidget />
	</div>
</template>