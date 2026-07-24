<template>
  <div class="bg-white border-t border-purple-light">
    <div class="grid-container flex flex-row justify-between items-center py-3">
      <ol class="flex list-none gap-2 w-full">
        <li
          v-for="(step, index) in steps"
          :key="step.number"
          class="flex gap-2 text-grey"
        >
          <NuxtLink
            :to="step.path"
            class="group flex gap-2 font-semibold text-grey-dark hover:text-grey-darkest hover:underline transition-all hover:underline-offset-4 hover:decoration-1"
            :class="{ 'text-purple hover:text-purple-dark': step.path === $route.path }"
          >
            <span class="block">
              {{ step.label }}
            </span>
          </NuxtLink>

          <span
            v-if="index + 1 != steps.length"
            class="block"
          >–</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheStepsIndicator',

  props: {
    steps: Array,
  },
}
</script>
