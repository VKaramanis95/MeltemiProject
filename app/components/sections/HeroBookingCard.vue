<script setup lang="ts">
const { t, tm, rt } = useI18n()


type CategoryOption = { id: string; label: string; price: number }
const categories = computed<CategoryOption[]>(() => {
  const raw = tm('booking.categories') as unknown as Array<{ id: unknown; label: unknown; price: number }>
  return raw.map((c) => ({
    id: rt(c.id as never),
    label: rt(c.label as never),
    price: c.price,
  }))
})


const booking = useState('bookingDraft', () => ({
  name: '',
  email: '',
  phone: '',
  pickupDate: '',
  returnDate: '',
  category: '',
  location: 'airport',
  notes: '',
}))


function toDateStr(d: Date) {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
const todayStr = toDateStr(new Date())
const minReturnDate = computed(() => booking.value.pickupDate || todayStr)


const selectedCategoryLabel = computed(
  () => categories.value.find((c) => c.id === booking.value.category)?.label ?? booking.value.category
)


type Status = 'idle' | 'submitting' | 'success' | 'error'
const status = ref<Status>('idle')

const { sendBookingEmail } = useEmailjs()

async function handleSubmit() {
  status.value = 'submitting'
  try {
    await sendBookingEmail({
      name: booking.value.name,
      email: booking.value.email,
      phone: booking.value.phone,
      pickupDate: booking.value.pickupDate,
      returnDate: booking.value.returnDate,
      category: booking.value.category,
      location: booking.value.location,
      notes: booking.value.notes,
    })
    status.value = 'success'
  } catch (error) {
    console.error('Booking email failed to send', error)
    status.value = 'error'
  }
}

function bookAnother() {
  booking.value = {
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    returnDate: '',
    category: '',
    location: 'airport',
    notes: '',
  }
  status.value = 'idle'
}


let successTimer: ReturnType<typeof setTimeout> | null = null
watch(status, (val) => {
  if (successTimer) {
    clearTimeout(successTimer)
    successTimer = null
  }
  if (val === 'success') {
    successTimer = setTimeout(bookAnother, 5000)
  }
})
onUnmounted(() => {
  if (successTimer) clearTimeout(successTimer)
})
</script>

<template>
  <div class="bg-white text-ink rounded-2xl shadow-2xl shadow-black/30 p-6">
    <template v-if="status !== 'success'">
      <h2 class="font-bold text-[1.05rem] text-navy-deep mb-4">{{ t('booking.quickTitle') }}</h2>

      <form class="flex flex-col gap-3" @submit.prevent="handleSubmit">
        <AppInput v-model="booking.name" icon="user" :placeholder="t('booking.labels.name')" />

        <AppInput v-model="booking.email" type="email" icon="mail" :placeholder="t('booking.labels.email')" />

        <AppInput v-model="booking.phone" type="tel" icon="phone" :placeholder="t('booking.labels.phone')" />

        <AppInput v-model="booking.pickupDate" type="date" icon="calendar-check" :placeholder="t('booking.labels.pickupDate')" :min="todayStr" />

        <AppInput v-model="booking.returnDate" type="date" icon="calendar-check" :placeholder="t('booking.labels.returnDate')" :min="minReturnDate" />

        <AppInput
          v-model="booking.category"
          type="select"
          icon="car"
          :placeholder="t('booking.labels.categoryPlaceholder')"
          :options="categories"
        />

        <div>
          <p class="text-[0.78rem] font-semibold text-ink-soft mb-1.5">{{ t('booking.labels.location') }}</p>
          <div class="flex gap-2">
            <label
              class="flex-1 flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-[0.82rem] font-medium cursor-pointer transition"
              :class="booking.location === 'airport' ? 'border-teal bg-teal/10 text-teal-ink' : 'border-line text-ink-soft hover:bg-surface-2'"
            >
              <input v-model="booking.location" type="radio" value="airport" required class="sr-only" />
              <Icon name="plane" size="14" stroke="1.8" class="flex-none" />
              {{ t('booking.labels.locationAirport') }}
            </label>
            <label
              class="flex-1 flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-[0.82rem] font-medium cursor-pointer transition"
              :class="booking.location === 'city' ? 'border-teal bg-teal/10 text-teal-ink' : 'border-line text-ink-soft hover:bg-surface-2'"
            >
              <input v-model="booking.location" type="radio" value="city" required class="sr-only" />
              <Icon name="car" size="14" stroke="1.8" class="flex-none" />
              {{ t('booking.labels.locationCity') }}
            </label>
          </div>
        </div>

        <AppButton type="submit" block class="mt-1" :loading="status === 'submitting'">
          {{ status === 'submitting' ? t('booking.submitting') : t('booking.submit') }}
        </AppButton>
        <p v-if="status === 'error'" class="text-center text-[0.8rem] font-semibold text-red-600">{{ t('booking.errorMsg') }}</p>
      </form>
    </template>

    <BookingSuccess
      v-else
      :name="booking.name"
      :category-label="selectedCategoryLabel"
      :pickup-date="booking.pickupDate"
      :return-date="booking.returnDate"
      :location="booking.location"
    />
  </div>
</template>