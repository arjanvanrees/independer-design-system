<template>
    <li class="flex gap-2">
        <Icon v-if="icon" :name="icon" :class="iconColor" />
        {{ label }}
        <slot />
    </li>
</template>

<script setup>  
defineProps({
  icon: String,
  iconColor: {
    type: String,
    default: 'text-green'
  },
  label: String
})
</script>