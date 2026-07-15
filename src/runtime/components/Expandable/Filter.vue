<template>
  <div class="bg-white shadow-raised rounded-xl">
    <button
      class="group flex items-center w-full pt-4 px-4 tablet:pt-6 tablet:px-6"
      :class="{ 'cursor-pointer': expandable }"
      @click.prevent="toggle"
    >
      <div class="font-serif font-semibold text-purple-dark line-clamp-1 text-left tablet:text-xl transition-all group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
        {{ title }}
      </div>

      <div class="flex ml-auto rounded-full transition-all duration-300 ring-4 ring-transparent group-hover:bg-purple-200 group-hover:ring-purple/20 group-active:bg-purple/40 group-active:ring-purple/40">
        <Icon
          v-if="expandable"
          name="eva:arrow-ios-downward-outline"
          class="ml-auto text-purple transition-all duration-300 group-hover:text-purple-dark"
          :class="{ '-rotate-180': expanded }"
        />
      </div>
    </button>

    <div class="px-4 pb-4 tablet:px-6 tablet:pb-6">
      <Collapse :when="expanded">
        <slot />
      </Collapse>
    </div>
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
