<script setup lang="ts">
const { t } = useI18n()
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

defineProps<{ car: FleetCar }>()
const emit = defineEmits<{ (e: 'select', carId: string): void }>()


function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  if (img.dataset.fallback) return 
  img.dataset.fallback = '1'
  img.src = '/images/cars/placeholder.jpg'
}
</script>

<template>
  <div
    class="snap-start flex-none min-w-0 w-[85%] min-[640px]:w-[calc((100%-20px)/2)] min-[960px]:w-[calc((100%-40px)/3)] bg-surface border border-line rounded-xl overflow-hidden flex flex-col"
  >
    <div class="relative w-full aspect-[4/3] bg-surface-2 flex items-center justify-center">
      <Icon name="car" size="40" stroke="1.2" class="text-ink-soft/40" />
      <img
        :src="`/images/cars/${car.id}.webp`"
        :alt="car.name"
        class="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        @error="onImgError"
      />
      <span
        v-if="car.price > 35"
        class="absolute top-3 right-3 bg-gold text-[#2a1c04] text-[0.68rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow"
      >
        {{ t('fleet.popularBadge') }}
      </span>
    </div>

    <div class="p-4 flex flex-col flex-1">
      <span class="self-start inline-block bg-teal text-white text-[0.68rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded">
        {{ car.category }}
      </span>
      <p class="mt-3 font-bold text-ink text-[0.98rem]">{{ car.name }}</p>
      <p class="mt-1.5 text-ink-soft text-[0.85rem] leading-relaxed">{{ car.desc }}</p>

      <div class="flex items-center flex-wrap gap-x-3 gap-y-1 mt-3 text-[0.78rem] text-ink-soft">
        <span class="flex items-center gap-1">
          <IconLabel icon="user" size="14" stroke="1.8">{{ car.seats }}</IconLabel>
        </span>
        <span class="w-px h-3 bg-line" />
        <span class="flex items-center gap-1">
          <IconLabel icon="door-open" size="14" stroke="1.8">{{ car.doors }}</IconLabel>
        </span>
        <span class="w-px h-3 bg-line" />
        <span class="flex items-center gap-1">
          <IconLabel icon="briefcase" size="14" stroke="1.8">{{ car.bags }}</IconLabel>
        </span>
        <span class="w-px h-3 bg-line" />
        <span class="flex items-center gap-1">
          <IconLabel icon="gearshift" size="14" stroke="1.8">{{ car.transmission }}</IconLabel>
        </span>
      </div>

      <p class="mt-auto pt-4 text-[1.3rem] font-extrabold text-navy-deep">
        €{{ car.price }}
        <span class="text-[0.75rem] font-medium text-ink-soft">{{ t('fleet.perDay') }}</span>
      </p>

      <AppButton block class="mt-3" @click="emit('select', car.id)">
        {{ t('fleet.bookLabel') }}
      </AppButton>
    </div>
  </div>
</template>