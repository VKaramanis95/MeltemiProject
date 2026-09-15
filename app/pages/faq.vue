<script setup lang="ts">

const { t, tm, rt } = useI18n()


type FaqQA = { q: string; a: string }
type FaqCategory = { name: string; items: FaqQA[] }

const categories = computed<FaqCategory[]>(() => {
  const raw = tm('faq.categories') as unknown as Array<{
    name: unknown
    items: Array<{ q: unknown; a: unknown }>
  }>
  return raw.map((cat) => ({
    name: rt(cat.name as never),
    items: cat.items.map((item) => ({
      q: rt(item.q as never),
      a: rt(item.a as never),
    })),
  }))
})


const localePath = useLocalePath()
const bookHref = computed(() => `${localePath('/')}#book`)
</script>

<template>
  <div>
    <section class="pt-14 min-[700px]:pt-20 pb-6">
      <div class="wrap">
        <SectionHead :eyebrow="t('faq.eyebrow')" :title="t('faq.title')" :intro="t('faq.intro')" center max-width="60ch" />
      </div>
    </section>

    <section class="pb-16 min-[700px]:pb-24">
      <div class="wrap max-w-2xl mx-auto">
        <div v-for="cat in categories" :key="cat.name" class="mb-10 last:mb-0">
          <h2 class="text-[0.75rem] font-bold uppercase tracking-wide text-teal-ink mb-2">{{ cat.name }}</h2>
          <div>
            <FaqItem v-for="item in cat.items" :key="item.q" :question="item.q" :answer="item.a" />
          </div>
        </div>

        <div class="mt-12 rounded-2xl border border-line bg-surface-2/60 p-6 min-[560px]:p-8 text-center">
          <p class="font-bold text-[1.05rem] text-ink">{{ t('faq.ctaTitle') }}</p>
          <p class="mt-1.5 text-ink-soft text-[0.9rem]">{{ t('faq.ctaText') }}</p>
          <AppButton class="mt-5" :href="bookHref">{{ t('faq.ctaButton') }}</AppButton>
        </div>
      </div>
    </section>
  </div>
</template>