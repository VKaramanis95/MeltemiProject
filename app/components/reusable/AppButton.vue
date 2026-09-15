<script setup lang="ts">

type Variant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'bare'

const props = withDefaults(
  defineProps<{
    href?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: Variant
    iconLeft?: string
    iconRight?: string
    iconSize?: string
    iconStroke?: string
    iconClass?: string
    arrow?: boolean
    loading?: boolean
    disabled?: boolean
    block?: boolean
  }>(),
  {
    href: undefined,
    type: 'button',
    variant: 'primary',
    iconLeft: undefined,
    iconRight: undefined,
    iconSize: '16',
    iconStroke: '2',
    iconClass: 'flex-none',
    arrow: false,
    loading: false,
    disabled: false,
    block: false,
  }
)

defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const isDisabled = computed(() => props.disabled || props.loading)


const variantClass = computed(() => {
  if (props.variant === 'icon') {
    return 'flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink hover:bg-surface-2'
  }
  if (props.variant === 'bare') {
    return 'flex items-center bg-transparent border-0 p-0 cursor-pointer'
  }
  return `btn btn-${props.variant}`
})
</script>

<template>
  <a
    v-if="href && !isDisabled"
    :href="href"
    :class="[variantClass, { 'w-full justify-center': block }]"
  >
    <Icon v-if="iconLeft" :name="iconLeft" :size="iconSize" :stroke="iconStroke" :class="iconClass" />
    <slot />
    <Icon v-if="iconRight" :name="iconRight" :size="iconSize" :stroke="iconStroke" :class="iconClass" />
    <span v-if="arrow" aria-hidden="true">→</span>
  </a>

  <button
    v-else
    :type="type"
    :disabled="isDisabled"
    :class="[variantClass, { 'w-full justify-center': block, 'opacity-70 cursor-wait': loading }]"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="flex-none animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
    >
      <circle cx="12" cy="12" r="9" stroke-opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke-linecap="round" />
    </svg>
    <Icon v-else-if="iconLeft" :name="iconLeft" :size="iconSize" :stroke="iconStroke" :class="iconClass" />

    <slot />

    <template v-if="!loading">
      <Icon v-if="iconRight" :name="iconRight" :size="iconSize" :stroke="iconStroke" :class="iconClass" />
      <span v-if="arrow" aria-hidden="true">→</span>
    </template>
  </button>
</template>