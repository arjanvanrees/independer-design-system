<template>
  <aside class="flex-col w-full hidden desktop:flex">
    <div class="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm z-10">
      <h3>{{ title }}</h3>
  
      <div class="flex flex-col items-start pb-6 border-b border-grey-light">
        <slot name="summary" />
      </div>
  
      <div>
        <slot name="content" />
      </div>
    </div>

    <div class="flex flex-col gap-4 -mt-6 pt-12 p-6 text-white bg-purple-dark rounded-b-xl">
      <slot name="footer" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
defineProps({
  title: String
})
</script>