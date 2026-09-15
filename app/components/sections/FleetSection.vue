<script setup lang="ts">
const { t, tm, rt } = useI18n()


type FleetCar = {
  id: string
  category: string
  name: string
  desc: string
  price: number
  seats: number
  doors: number
  bags: number
  transmission: string
}


const cars = computed<FleetCar[]>(() => {
  const raw = tm('fleet.cars') as unknown as Array<{
    id: unknown
    category: unknown
    name: unknown
    desc: unknown
    price: number
    seats: number
    doors: number
    bags: number
    transmission: unknown
  }>
  return raw.map((c) => ({
    id: rt(c.id as never),
    category: rt(c.category as never),
    name: rt(c.name as never),
    desc: rt(c.desc as never),
    price: c.price,
    seats: c.seats,
    doors: c.doors,
    bags: c.bags,
    transmission: rt(c.transmission as never),
  }))
})

const emit = defineEmits<{ (e: 'select-car', carId: string): void }>()

const scrollerRef = ref<HTMLElement | null>(null)
function scrollByCard(dir: 1 | -1) {
  const el = scrollerRef.value
  if (!el) return
  const first = el.querySelector('[data-card]') as HTMLElement | null
  const amount = (first?.offsetWidth ?? 280) + 20
  el.scrollBy({ left: dir * amount, behavior: 'smooth' })
}
</script>

<template>
  <section id="cars">
    <div class="wrap">
     
      <div class="grid grid-cols-1 min-[700px]:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div class="hidden min-[700px]:block" aria-hidden="true" />

        <SectionHead :eyebrow="t('fleet.eyebrow')" :title="t('fleet.title')" :intro="t('fleet.intro')" center class="mb-0" />

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

    
      <div
        ref="scrollerRef"
        class="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 mt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <FleetCarCard
          v-for="car in cars"
          :key="car.id"
          data-card
          :car="car"
          @select="emit('select-car', $event)"
        />
      </div>
    </div>
  </section>
</template>