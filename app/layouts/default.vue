<script setup lang="ts">

const { t } = useI18n()
useHead({
  title: computed(() => t('site.name')),
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
	</div>
</template>