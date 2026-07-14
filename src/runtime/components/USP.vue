<template>
    <li class="flex gap-2">
        <Icon v-if="icon" :name="icon" :class="[iconColor, iconClass]" />
        
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
  iconClass: {
    type: String,
    default: ''
  },
  label: String
})
</script>