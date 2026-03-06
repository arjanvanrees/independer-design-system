<template>
  <label class="radio group flex py-3 cursor-pointer" :for="id">
    <input class="sr-only peer" type="radio" :id="id" :name="name" :value="value" :ref="name"
      :checked="value === modelValue || checked" :disabled="disabled"
      @change="emit('update:modelValue', $event.target.value)" v-on:focus="emit('focus', $event)" />
    <div class="
        radio-icon
        relative
        block
        w-6
        h-6
        mr-2
        border border-grey
        rounded-xl
        transition-all
        ease-out
        shrink-0
        bg-white
        hover:border-grey-dark
        group-hover:border-grey-dark
        peer-focus:border-green peer-focus:ring-4
        ring-green/40
        peer-checked:border-green
        peer-checked:hover:border-green-dark
        group-hover:peer-checked:border-green-dark
        group-hover:peer-checked:after:bg-green-dark
        peer-checked:after:absolute
        peer-checked:after:content-['']
        peer-checked:after:w-3
        peer-checked:after:h-3
        peer-checked:after:mt-[0.3125rem]
        peer-checked:after:ml-[0.3125rem]
        peer-checked:after:rounded-xl
        peer-checked:after:transition-all
        peer-checked:after:bg-green
        peer-disabled:bg-grey-light
      " />

    <div class="flex flex-col w-full">
      <div class="flex" :class="{ 'flex-col tablet:flex-row': price }">
        <span :class="{ 'text-grey-dark': disabled }">{{ label }}</span>

        <Icon v-if="tooltip" name="eva:info-outline" class="ml-2 cursor-pointer text-grey-dark" />

        <LabelAdvice v-if="advice" :label="adviceLabel" />

        <div v-if="number" class="ml-auto text-grey-dark">{{ number }}</div>
        <div v-if="price && value === modelValue" class="ml-0 tablet:ml-auto text-grey-dark">{{ price }}</div>
      </div>

      <slot />
    </div>
  </label>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'focus']);

defineProps({
  id: String,
  name: String,
  label: String,
  value: [String, Boolean],
  modelValue: [String, Boolean],
  checked: Boolean,
  disabled: Boolean,
  advice: Boolean,
  adviceLabel: String,
  tooltip: Boolean,
  number: String,
  price: String,
  semibold: Boolean,
});

const slots = useSlots();
const slotPassed = !!slots.default;
</script>


<style>
@reference '../assets/styles/index.css';

.radio:hover,
.radio:focus {
  @apply border-grey;
}
</style>