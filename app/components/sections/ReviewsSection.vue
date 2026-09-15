<script setup lang="ts">

const { t } = useI18n()
const reviewDefaults = [
  { name: 'Maria K.', rating: 5 },
  { name: 'Nikos P.', rating: 5 },
  { name: 'Elena T.', rating: 4 },
  { name: 'Giorgos D.', rating: 5 },
  { name: 'Sophia R.', rating: 5 },
  { name: 'Dimitris L.', rating: 4 },
] as const


const scrollerRef = ref<HTMLElement | null>(null)
function scrollByCard(dir: 1 | -1) {
  const el = scrollerRef.value
  if (!el) return
  const first = el.querySelector('[data-card]') as HTMLElement | null
  const amount = (first?.offsetWidth ?? 280) + 20 // card width + gap
  el.scrollBy({ left: dir * amount, behavior: 'smooth' })
}
</script>

<template>
  <section id="reviews">
    <div class="wrap">
      <div class="grid grid-cols-1 min-[700px]:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div class="hidden min-[700px]:block" aria-hidden="true" />

        <SectionHead :eyebrow="t('reviews.eyebrow')" :title="t('reviews.title')" :intro="t('reviews.intro')" center class="mb-0" max-width="60ch" />

        <div class="flex gap-2 justify-center min-[700px]:justify-end">
          <AppButton
            variant="icon"
            aria-label="Previous"
            icon-left="chevron-down"
            icon-size="18"
            icon-class="rotate-90"
            @click="scrollByCard(-1)"
          />
          <AppButton
            variant="icon"
            aria-label="Next"
            icon-left="chevron-down"
            icon-size="18"
            icon-class="-rotate-90"
            @click="scrollByCard(1)"
          />
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <span
          class="inline-flex items-center gap-2 bg-surface-2 border border-line rounded-full px-4 py-2 text-[0.85rem] font-medium text-ink"
          v-html="t('reviews.ratingLine')"
        />
      </div>


      <div
        ref="scrollerRef"
        class="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 mt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ReviewCard
          v-for="(r, i) in reviewDefaults"
          :key="r.name"
          data-card
          class="snap-start flex-none min-w-0 w-[85%] min-[640px]:w-[calc((100%-20px)/2)] min-[960px]:w-[calc((100%-40px)/3)]"
          :name="r.name"
          :rating="r.rating"
          :text="t(`reviews.placeholderTexts.${i}`)"
        />
      </div>
    </div>
  </section>
</template>