<template>
  <div class="flex w-full">
    <div class="flex flex-col">
      <div class="font-semibold">
        {{ company }}
      </div>
      <div class="text-grey-dark">
        {{ product }}
      </div>
    </div>

    <img
      class="w-27 h-12 ml-auto object-contain object-right"
      :src="logo"
    >
  </div>
</template>

<script lang="ts" setup>
defineProps({
  logo: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
})
</script>
