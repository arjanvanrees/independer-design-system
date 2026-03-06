<template>
  <div class="bg-white border-b border-b-purple-light">
    <div class="grid-container flex flex-row justify-between items-center px-4 py-3 tablet:px-6 desktop:px-0">
      <ol class="flex list-none gap-2 w-full">
        <li v-for="(step, index) in steps" class="flex gap-2 text-grey">
          <router-link :to="step.path" class="group flex gap-2 font-semibold text-grey-dark hover:text-grey-darkest hover:underline transition-all hover:underline-offset-4 hover:decoration-1" :class="{ 'text-purple hover:text-purple-dark': step.path === $route.path }">
            <span class="block">
              {{ step.label }}
            </span>
          </router-link>

          <span v-if="index + 1 != steps.length" class="block">–</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true,
  },
})
</script>