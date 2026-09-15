<script setup lang="ts">
const selectedCategory = ref('')
const bookingFormRef = ref<{ focusName: () => void } | null>(null)

function handleSelectCar(carId: string) {
  selectedCategory.value = carId
  const el = document.getElementById('book')
  el?.scrollIntoView({ behavior: 'smooth' })
  nextTick(() => {
    setTimeout(() => bookingFormRef.value?.focusName(), 400)
  })
}
</script>

<template>
  <div>
    <HeroSection />
    <WhySection />
    <FleetSection @select-car="handleSelectCar" />
    <PriceTruthSection />
    <BookingForm ref="bookingFormRef" :selected-category="selectedCategory" />
    <ReviewsSection />
  </div>
</template>