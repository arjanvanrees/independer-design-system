<template>
  <div class="relative">
    <label v-if="label" class="block mb-1 font-semibold" :class="labelClasses" :for="name">{{ label }}</label>
    <div class="relative">
      <input class="
            block
            h-12
            py-[0.6875rem]
            px-3
            pl-10
            border border-grey
            rounded-lg
            w-full
            transition-all
            ease-out
            hover:border-grey-dark
            focus:border-green-dark focus:ring-1
            outline-none 
            focus:ring-purple
            appearance-none
            disabled:bg-grey-light
            disabled:border-grey
            disabled:cursor-not-allowed
            " :class="{ 'pl-10': leadingIcon, 'pr-12': trailingIcon, 'pr-20': steps }" :type="type" :id="name"
        :name="name" :value="modelValue" :inputmode="inputmode" :pattern="pattern" :min="min" :ref="name"
        :autocomplete="autocomplete" :disabled="disabled" :placeholder="placeholder"
        @input="emit('update:modelValue', $event.target.value)" />

      <Icon name="eva:search-outline" class="absolute bottom-3 left-3 pointer-events-none text-purple" />

      <Icon name="eva:arrow-ios-downward-outline" class="absolute bottom-3 right-3 pointer-events-none text-purple" />
    </div>

    <ul class="absolute bg-white w-full border border-grey rounded-b-lg z-30">
      <li v-for="option in options" :key="option" class="p-3">
        {{ option.label }}
      </li>
    </ul>
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
});

const query = ref('');
</script>