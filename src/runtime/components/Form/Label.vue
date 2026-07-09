<template>
  <label
    class="block mb-1 font-semibold"
    :class="labelClasses"
    :for="name"
  >
    <div class="inline-flex gap-2">{{ label }} <Icon
      v-if="tooltip"
      name="eva:info-outline"
      class="inline-block! text-grey-dark cursor-pointer hover:text-grey-darkest"
      @click="emit('tooltip')"
    /></div>
    <div
      v-if="description"
      class="font-normal text-grey-dark"
    >{{ description }}</div>
  </label>
</template>

<script setup>
const emit = defineEmits(['tooltip'])

defineProps({
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  labelClasses: {
    type: String,
    required: false,
  },
  tooltip: {
    type: Boolean,
    default: false,
  },
})
</script>
