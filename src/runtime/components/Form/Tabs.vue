<template>
  <div class="flex gap-1 p-1 bg-white border border-grey rounded-lg hover:border-grey-dark transition-all">
    <label
      v-for="option in options"
      :key="option.id || option.value"
      class="relative flex w-1/2 cursor-pointer"
      :for="option.id"
    >
      <input
        :id="option.id"
        :ref="option.name"
        class="sr-only peer"
        type="radio"
        :name="option.name"
        :value="option.value"
        :checked="option.value === modelValue"
        :disabled="option.disabled"
        @change="emit('update:modelValue', $event.target.value)"
      >
      <div
        class="
        relative
        flex
        w-full
        p-2
        px-1
        rounded
        transition-all
        ease-out
        duration-500
        bg-white
        peer-focus:border-purple peer-focus:ring-1
        ring-purple
        peer-checked:bg-purple
        peer-checked:!text-white
        peer-disabled:bg-white
        peer-disabled:!text-grey-dark
        peer-disabled:cursor-not-allowed
        peer-disabled:hover:bg-white
        peer-checked:hover:bg-purple
        hover:bg-black/20
        "
      >
        <div class="w-full text-center">
          <div
            class="tab font-semibold"
            :class="{ ' tablet:text-xl': largeTitle }"
          >{{ option.label }}</div>
          <div
            v-if="option.description"
            class="text-sm"
          >{{ option.description }}</div>
        </div>
      </div>
    </label>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

defineProps({
  id: String,
  name: String,
  label: String,
  value: String,
  inputmode: String,
  pattern: String,
  checked: Boolean,
  disabled: Boolean,
  advice: Boolean,
  options: Array,
  modelValue: String,
  largeTitle: Boolean,
})
</script>
