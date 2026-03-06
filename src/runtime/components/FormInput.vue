<template>
  <div>
    <FormLabel v-if="label" :name="name" :description="descriptionTop" :label="label" :label-classes="labelClasses" />

    <div class="relative">
      <Icon v-if="leadingIcon" :name="leadingIcon" class="absolute ml-3 mt-3" />

      <div v-if="trailingIcon" class="absolute right-0 mr-3 mt-3">
        {{ trailingIcon }}
      </div>

      <div v-if="steps" class="flex gap-2 absolute right-0 mr-3 mt-3">
        <button class="text-purple hover:text-purple-dark" @click.prevent="stepDown">
          <Icon name="eva:minus-circle-outline" />
        </button>

        <button class="text-purple hover:text-purple-dark" @click.prevent="stepUp">
          <Icon name="eva:plus-circle-outline" />
        </button>
      </div>

      <input class="
          block
          h-12
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
        " :class="{ 'pl-10': leadingIcon, 'pr-12': trailingIcon, 'pr-20': steps }" :type="type" :id="name" :name="name"
        :value="modelValue" :inputmode="inputmode" :pattern="pattern" :min="min" :ref="name"
        :autocomplete="autocomplete" :disabled="disabled" :placeholder="placeholder"
        @input="emit('update:modelValue', $event.target.value)" v-on:blur="emit('blur', $event)"
        v-on:focus="emit('focus', $event)" v-maska="mask" />
    </div>

    <div v-if="description" class="mt-2 text-grey-dark">{{ description }}</div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus', 'step-up', 'step-down'])

defineProps({
  name: String,
  label: String,
  type: String,
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
  mask: {
    type: [String, Object],
    default: ''
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