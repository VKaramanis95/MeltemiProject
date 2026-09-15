<script setup lang="ts">

const props = defineProps<{
  name: string
  categoryLabel: string
  pickupDate: string
  returnDate: string
  location: string
}>()

const { t, locale } = useI18n()
function formatDate(value: string) {
  if (!value) return ''
  const d = new Date(`${value}T00:00:00`)
  if (Number.isNaN(d.getTime())) return value
  return new Intl.DateTimeFormat(locale.value, { day: 'numeric', month: 'short', year: 'numeric' }).format(d)
}
</script>

<template>
  <div class="flex flex-col items-center text-center py-4">
    <div class="relative flex items-center justify-center w-16 h-16">
      <span class="absolute inset-0 rounded-full bg-teal/20 animate-ping [animation-iteration-count:1] [animation-duration:0.9s]" />
      <span class="relative flex items-center justify-center w-16 h-16 rounded-full bg-teal/15 text-teal-ink">
        <Icon name="check" size="30" stroke="2.4" />
      </span>
    </div>

    <p class="mt-5 font-bold text-[1.15rem] text-ink">{{ t('booking.successHeading', { name }) }}</p>
    <p class="mt-1.5 text-ink-soft text-[0.88rem] max-w-[32ch]">{{ t('booking.successMsg') }}</p>
    <div class="w-full mt-6 rounded-xl border border-line bg-surface-2/60 p-4 text-left">
      <p class="text-[0.68rem] font-bold uppercase tracking-wide text-ink-soft/80 mb-3">{{ t('booking.successRecapLabel') }}</p>
      <div class="grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-4 gap-y-2.5">
        <div class="flex items-center gap-2 text-ink-soft text-[0.85rem]">
          <IconLabel icon="car" size="15" stroke="1.8">{{ categoryLabel }}</IconLabel>
        </div>
        <div class="flex items-center gap-2 text-ink-soft text-[0.85rem]">
          <IconLabel :icon="location === 'airport' ? 'plane' : 'car'" size="15" stroke="1.8">
            {{ location === 'airport' ? t('booking.labels.locationAirport') : t('booking.labels.locationCity') }}
          </IconLabel>
        </div>
        <div class="flex items-center gap-2 text-ink-soft text-[0.85rem]">
          <IconLabel icon="calendar-check" size="15" stroke="1.8">{{ formatDate(pickupDate) }}</IconLabel>
        </div>
        <div class="flex items-center gap-2 text-ink-soft text-[0.85rem]">
          <IconLabel icon="calendar-check" size="15" stroke="1.8">{{ formatDate(returnDate) }}</IconLabel>
        </div>
      </div>
    </div>

    <p class="mt-5 text-[0.75rem] text-ink-soft/70">{{ t('booking.successAutoReset') }}</p>
  </div>
</template>