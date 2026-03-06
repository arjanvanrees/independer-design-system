<template>
  <label class="block mb-1 font-semibold" :class="labelClasses" :for="name">
    {{ label }}
    <div v-if="description" class="font-normal text-grey-dark">{{ description }}</div>
  </label>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  labelClasses: {
    type: String,
    required: false,
  }
});
</script>