<template>
  <div class="w-full bg-white shadow-raised rounded-xl transition-all">
    <button
      class="group w-full flex items-center p-4 tablet:p-6"
      :class="{ 'cursor-pointer': expandable }"
      @click.prevent="toggle"
    >
      <h3 class="transition-all group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
        {{ title }}
      </h3>

      <div class="flex ml-auto rounded-full transition-all duration-300 ring-4 ring-transparent group-hover:bg-purple-200 group-hover:ring-purple/20 group-active:bg-purple/40 group-active:ring-purple/40">
        <Icon
          v-if="expandable"
          name="eva:arrow-ios-downward-outline"
          class="text-purple transition-all duration-300 group-hover:text-purple-dark"
          :class="{ '-rotate-180': expanded }"
        />
      </div>
    </button>

    <Collapse
      :when="expanded"
      class="v-collapse"
    >
      <div class="p-4 pt-0 tablet:p-6 tablet:pt-0">
        <slot />
      </div>
    </Collapse>
  </div>
</template>

<script setup>
import { Collapse } from 'vue-collapsed'
import { onMounted, ref } from 'vue'

const expanded = ref(false)

const props = defineProps({
  title: String,
  expanded: {
    type: Boolean,
    default: false,
  },
  expandable: {
    type: Boolean,
    default: true,
  },
})

onMounted(() => {
  if (!props.expandable || props.expanded) {
    expanded.value = true
  }
})

const toggle = () => {
  if (!props.expandable) {
    return
  }

  expanded.value = !expanded.value
}
</script>
