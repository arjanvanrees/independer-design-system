<template>
  <fieldset
    :disabled="disabled"
    :aria-describedby="[$slots.default && `${groupId}-description`, error && `${groupId}-error`].filter(Boolean).join(' ') || undefined"
    :aria-invalid="error ? 'true' : undefined"
  >
    <legend class="block mb-1 font-semibold">
      {{ label }}
    </legend>

    <IndFormRadio
      v-for="(option, index) in options"
      :id="option.id || `${groupId}-option-${index}`"
      :key="option.value"
      :name="name"
      :value="option.value"
      :label="option.label"
      :model-value="modelValue"
      :disabled="disabled || option.disabled"
      @update:model-value="emit('update:modelValue', option.value)"
    />

    <div
      v-if="$slots.default"
      :id="`${groupId}-description`"
    >
      <slot />
    </div>
    <p
      v-if="error"
      :id="`${groupId}-error`"
      class="mt-1 text-red-800"
    >
      {{ error }}
    </p>
  </fieldset>
</template>

<script setup>
import { useId } from 'vue'

const emit = defineEmits(['update:modelValue'])

defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: [String, Boolean],
  disabled: Boolean,
  error: String,
})

const groupId = useId()
</script>
