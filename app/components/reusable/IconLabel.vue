<script setup lang="ts">

withDefaults(
  defineProps<{
    
    icon?: string
    size?: string
    stroke?: string
    iconClass?: string
  }>(),
  {
    icon: undefined,
    size: '16',
    stroke: '2',
    iconClass: 'flex-none',
  }
)
</script>

<template>
  <Icon :name="icon" :size="size" :stroke="stroke" :class="iconClass" />
  <slot />
</template>