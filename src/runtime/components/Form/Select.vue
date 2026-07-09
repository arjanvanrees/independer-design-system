<template>
  <div>
    <IndFormLabel
      v-if="label"
      :name="name"
      :label="label"
      :label-classes="labelClasses"
    />
    <div class="relative">
      <Icon
        v-if="leadingIcon"
        :name="leadingIcon"
        class="absolute ml-3 mt-3 text-grey-darker"
      />

      <select
        :id="name"
        class="
          block
          py-[0.6875rem]
          px-3
          w-full
          bg-white
          border border-grey
          rounded-lg
          transition-all
          ease-out
          hover:border-grey-dark
          focus:border-purple focus:ring-1 focus:outline-none
          ring-purple
          appearance-none
          disabled:bg-grey-light disabled:hover:border-grey
        "
        :name="name"
        :disabled="disabled"
        :value="modelValue"
        :class="{ 'border-red-800': error, 'pl-10': leadingIcon }"
        @change="emit('update:modelValue', $event.target.value)"
        @blur="emit('blur', $event)"
      >
        <option
          disabled
          value=""
        >
          {{ defaultOption }}
        </option>

        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <Icon
        name="eva:arrow-ios-downward-outline"
        class="absolute bottom-3 right-3 pointer-events-none text-purple"
      />
    </div>
    <div
      v-if="error"
      class="mt-1 text-red-800"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'blur'])

defineProps({
  name: String,
  label: String,
  options: Array,
  modelValue: {
    type: String,
    default: '',
  },
  disabled: Boolean,
  labelClasses: String,
  leadingIcon: String,
  defaultOption: {
    type: String,
    default: 'Kies',
  },
  error: String,
})
</script>
