<template>
  <div>
    <FormLabel v-if="label" :name="name" :label="label" :label-classes="labelClasses" />
    <div class="relative">
      <Icon v-if="leadingIcon" :name="leadingIcon" class="absolute ml-3 mt-3 text-grey-darker" />

      <select class="
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
        " :id="name" :disabled="disabled" :value="modelValue" :class="{ 'pl-10': leadingIcon }"
        :placeholder="defaultOption" @change="emit('update:modelValue', $event.target.value)">
        <option disabled selected>{{ defaultOption }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value"
          :selected="option.value === modelValue">
          {{ option.label }}
        </option>
      </select>

      <Icon name="eva:arrow-ios-downward-outline" class="absolute bottom-3 right-3 pointer-events-none text-purple" />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);

defineProps({
  name: String,
  label: String,
  options: Array,
  selected: String,
  modelValue: String,
  disabled: Boolean,
  labelClasses: String,
  leadingIcon: String,
  defaultOption: {
    type: String,
    default: 'Kies',
  },
});
</script>