<template>
  <div>
    <IndFormLabel
      v-if="label"
      :name="name"
      :description="descriptionTop"
      :label="label"
      :label-classes="labelClasses"
      :tooltip="tooltip"
    />
 
    <div class="relative">
      <Icon
        v-if="leadingIcon"
        :name="leadingIcon"
        class="absolute ml-3 mt-3"
      />

      <Icon 
        v-if="trailingIcon" 
        :name="trailingIcon" 
        class="absolute right-0 mr-3 mt-3 text-purple"
      />

      <div v-if="steps" class="flex gap-2 absolute right-0 mr-3 mt-3">
        <button class="text-purple hover:text-purple-dark" @click.prevent="stepDown">
          <Icon name="eva:minus-circle-outline" />
        </button>

        <button class="text-purple hover:text-purple-dark" @click.prevent="stepUp">
          <Icon name="eva:plus-circle-outline" />
        </button>
      </div>

      <textarea
        class="
          block
          min-h-12
          py-[0.6875rem]
          px-3
          border border-grey
          rounded-lg
          w-full
          transition-all
          ease-out
          bg-white
          hover:border-grey-dark
          outline-none 
          appearance-none
          disabled:bg-grey-light
          disabled:border-grey
          disabled:cursor-not-allowed
        "
        :class="{ 'border-red-800': error, 'pl-10': leadingIcon, 'pr-12': trailingIcon, 'pr-20': steps }"
        :type="type"
        :id="name"
        :name="name"
        :value="modelValue"
        :inputmode="inputmode"
        :pattern="pattern"
        :min="min"
        :ref="name"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :placeholder="placeholder"
        :rows="rows"
        @input="emit('update:modelValue', $event.target.value)"
        @blur="emit('blur', $event)"
        v-maska="mask"
      />
    </div>

    <div v-if="error" class="mt-1 text-red-800">{{ error }}</div>
    <div v-if="description" class="mt-2 text-grey-dark">{{ description }}</div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus', 'step-up', 'step-down'])

defineProps({
  name: String,
  label: String,
  type: String,
  tooltip: {
    type: Boolean,
    default: false
  },
  modelValue: [String, Number],
  inputmode: String,
  pattern: String,
  min: String,
  autocomplete: String,
  leadingIcon: String,
  trailingIcon: String,
  disabled: Boolean,
  steps: Boolean,
  description: String,
  descriptionTop: String,
  placeholder: String,
  labelClasses: String,
  error: String,
  mask: {
    type: [String, Object],
    default: ''
  },
  rows: {
    type: [String, Number],
    default: 2
  }
})

const stepUp = () => {
  emit('step-up')
}

const stepDown = () => {
  emit('step-down')
}
</script>

<style scoped>
input[type='date']::-webkit-calendar-picker-indicator {
    display: none;
}
</style>