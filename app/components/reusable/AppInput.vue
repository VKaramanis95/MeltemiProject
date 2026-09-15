<script setup lang="ts">

type Option = { id: string; label: string }

withDefaults(
  defineProps<{
    icon: string
    type?: 'text' | 'email' | 'tel' | 'date' | 'select'
    placeholder?: string
    required?: boolean
    options?: Option[]

    min?: string
  }>(),
  {
    type: 'text',
    placeholder: '',
    required: true,
    options: () => [],
    min: undefined,
  }
)

const model = defineModel<string>({ default: '' })


const fieldRef = ref<HTMLInputElement | HTMLSelectElement | null>(null)
function focus() {
  fieldRef.value?.focus()
}
defineExpose({ focus })
</script>

<template>
  <label class="relative flex items-center">
    <Icon :name="icon" size="18" stroke="1.4" class="absolute left-3 text-ink-soft/70" />

    <select
      v-if="type === 'select'"
      ref="fieldRef"
      v-model="model"
      :required="required"
      :aria-label="placeholder"
      class="w-full appearance-none rounded-lg border border-line bg-surface pl-10 pr-8 py-2.5 text-[0.9rem] text-ink focus:outline-none focus:ring-2 focus:ring-teal"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="o in options" :key="o.id" :value="o.id">{{ o.label }}</option>
    </select>

    <input
      v-else
      ref="fieldRef"
      v-model="model"
      :type="type"
      :required="required"
      :placeholder="type === 'date' ? undefined : placeholder"
      :aria-label="type === 'date' ? placeholder : undefined"
      :min="type === 'date' ? min : undefined"
      class="w-full rounded-lg border border-line bg-surface pl-10 pr-3 py-2.5 text-[0.9rem] text-ink focus:outline-none focus:ring-2 focus:ring-teal"
    />

    <Icon
      v-if="type === 'select'"
      name="chevron-down"
      size="14"
      stroke="1.6"
      class="absolute right-3 text-ink-soft/70 pointer-events-none"
    />
  </label>
</template>