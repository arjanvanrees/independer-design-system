<template>
  <label
    class="checkbox group flex gap-2 py-3 cursor-pointer"
    :for="id"
  >
    <input
      :id="id"
      :ref="name"
      class="sr-only peer"
      type="checkbox"
      :name="name"
      :value="value"
      :disabled="disabled"
      :checked="modelValue || checked"
      @change="emit('update:modelValue', $event.target.checked)"
      @focus="emit('focus', $event)"
    >
    <div class="checkbox-icon" />

    <div class="flex flex-col w-full">
      <div class="flex">
        <span :class="labelClasses">{{ label }}</span>

        <Icon
          v-if="tooltip"
          name="eva:info-outline"
          class="ml-2 cursor-pointer text-grey-dark"
        />

        <IndPill
          v-if="advice"
          :label="adviceLabel"
          color="brand-primary"
          class="ml-2"
        />

        <div
          v-if="number"
          class="ml-auto text-grey-dark"
        >{{ number }}</div>
      </div>

      <slot />
    </div>
  </label>
</template>

<script setup>
defineOptions({
  name: 'IndFormCheckbox',
})

const emit = defineEmits(['update:modelValue', 'focus'])

defineProps({
  id: String,
  name: String,
  label: String,
  value: [String, Boolean],
  checked: Boolean,
  advice: Boolean,
  adviceLabel: String,
  tooltip: Boolean,
  labelClasses: String,
  disabled: Boolean,
  modelValue: Boolean,
  number: String,
})
</script>

<style>
@reference '../../assets/style.css';

.checkbox-icon {
  @apply relative
        block
        w-6
        h-6
        shrink-0
        border border-grey
        rounded
        transition-all
        ease-out
        bg-white
        hover:border-grey-dark
        group-hover:border-grey-dark
        peer-focus:border-green peer-focus:ring-4
        ring-green/40
        peer-checked:border-green
        peer-checked:hover:border-green-dark
        group-hover:peer-checked:border-green-dark
        peer-checked:after:absolute
        peer-checked:after:content-['']
        peer-checked:after:w-3
        peer-checked:after:h-3
        peer-checked:after:mt-[0.3125rem]
        peer-checked:after:ml-[0.3125rem]
        peer-disabled:bg-grey-light
        peer-disabled:border-grey
        peer-disabled:hover:border-grey
}

.checkbox-icon::after {
  background: url('../../assets/images/checkbox.svg') no-repeat center center;
  background-size: contain;
}
</style>
