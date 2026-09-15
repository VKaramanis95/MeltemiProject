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


const props = defineProps<{ selectedCategory: string }>()
const emit = defineEmits<{ (e: 'update:selectedCategory', v: string): void }>()

watch(
  () => props.selectedCategory,
  (val) => {
    if (val) booking.value.category = val
  },
  { immediate: true }
)
watch(
  () => booking.value.category,
  (val) => emit('update:selectedCategory', val)
)

const nameFieldRef = ref<{ focus: () => void } | null>(null)
function focusName() {
  nameFieldRef.value?.focus()
}
defineExpose({ focusName })

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
    // eslint-disable-next-line no-console
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
  <section id="book" class="bg-surface-2/40">
    <div class="wrap">
      <SectionHead :eyebrow="t('booking.eyebrow')" :title="t('booking.title')" :intro="t('booking.intro')" center max-width="60ch" />

      <div class="max-w-2xl mx-auto mt-10">
        <div class="bg-surface rounded-2xl border border-line shadow-sm p-6 min-[640px]:p-8">
          <form v-if="status !== 'success'" class="grid grid-cols-1 min-[560px]:grid-cols-2 gap-4" @submit.prevent="handleSubmit">
            <AppInput ref="nameFieldRef" v-model="booking.name" icon="user" :placeholder="t('booking.labels.name')" class="min-[560px]:col-span-2" />

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
              class="min-[560px]:col-span-2"
            />

            <div class="min-[560px]:col-span-2">
              <p class="text-[0.8rem] font-semibold text-ink-soft mb-2">{{ t('booking.labels.location') }}</p>
              <div class="flex gap-2">
                <label
                  class="flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[0.88rem] font-medium cursor-pointer transition"
                  :class="booking.location === 'airport' ? 'border-teal bg-teal/10 text-teal-ink' : 'border-line text-ink-soft hover:bg-surface-2'"
                >
                  <input v-model="booking.location" type="radio" value="airport" required class="sr-only" />
                  <Icon name="plane" size="16" stroke="1.8" class="flex-none" />
                  {{ t('booking.labels.locationAirport') }}
                </label>
                <label
                  class="flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[0.88rem] font-medium cursor-pointer transition"
                  :class="booking.location === 'city' ? 'border-teal bg-teal/10 text-teal-ink' : 'border-line text-ink-soft hover:bg-surface-2'"
                >
                  <input v-model="booking.location" type="radio" value="city" required class="sr-only" />
                  <Icon name="car" size="16" stroke="1.8" class="flex-none" />
                  {{ t('booking.labels.locationCity') }}
                </label>
              </div>
            </div>

            <label class="min-[560px]:col-span-2 flex flex-col gap-1.5">
              <span class="text-[0.8rem] font-semibold text-ink-soft">{{ t('booking.labels.notes') }}</span>
              <textarea
                v-model="booking.notes"
                rows="3"
                :placeholder="t('booking.labels.notesPlaceholder')"
                class="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-[0.9rem] text-ink focus:outline-none focus:ring-2 focus:ring-teal resize-none"
              />
            </label>

            <div class="min-[560px]:col-span-2">
              <AppButton type="submit" block :loading="status === 'submitting'">
                {{ status === 'submitting' ? t('booking.submitting') : t('booking.submit') }}
              </AppButton>
              <p class="mt-3 text-center text-[0.78rem] text-ink-soft">{{ t('booking.note') }}</p>
              <p v-if="status === 'error'" class="mt-3 text-center text-[0.85rem] font-semibold text-red-600">{{ t('booking.errorMsg') }}</p>
            </div>
          </form>

          <BookingSuccess
            v-else
            :name="booking.name"
            :category-label="selectedCategoryLabel"
            :pickup-date="booking.pickupDate"
            :return-date="booking.returnDate"
            :location="booking.location"
          />
        </div>
      </div>
    </div>
  </section>
</template>