<template>
  <Combobox
    as="div"
    :model-value="modelValue"
    :name="name"
    :nullable="nullable"
    :disabled="disabled"
    @update:model-value="selectOption"
  >
    <ComboboxLabel
      v-if="label"
      class="block mb-1 font-semibold"
      :class="labelClasses"
    >
      {{ label }}
    </ComboboxLabel>

    <div class="relative w-full">
      <ComboboxInput
        :id="name"
        class="block h-12 py-[0.6875rem] px-3 pr-12 border rounded-lg w-full bg-white transition-all ease-out focus:border-purple focus:ring-1 focus:ring-purple outline-none appearance-none disabled:bg-grey-light disabled:cursor-not-allowed"
        :class="{
          'border-red-800': error,
          'border-grey hover:border-grey-dark disabled:hover:border-grey': !error,
          'pl-10': leadingIcon,
        }"
        :display-value="displayValue"
        :placeholder="placeholder"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${name}-error` : undefined"
        @change="updateQuery"
        @blur="onBlur"
        @focus="emit('focus', $event)"
      />
      <ComboboxButton
        class="absolute bottom-0 right-0 flex items-center p-3 disabled:cursor-not-allowed"
        :aria-label="buttonLabel"
      >
        <Icon
          name="eva:arrow-ios-downward-outline"
          class="pointer-events-none text-purple"
          aria-hidden="true"
        />
      </ComboboxButton>
      <Icon
        v-if="leadingIcon"
        :name="leadingIcon"
        class="absolute bottom-3 left-3 pointer-events-none text-grey-dark"
        aria-hidden="true"
      />
      <ComboboxOptions class="absolute w-full max-h-44 mt-2 bg-white border border-grey rounded-lg shadow-overlay overflow-y-auto z-50">
        <ComboboxOption
          v-for="option in filteredOptions"
          :key="option.value"
          v-slot="{ active, selected }"
          :value="option.value"
          as="template"
        >
          <li
            class="p-3 border-b border-grey-light cursor-pointer hover:bg-purple-light last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
            :class="{ 'bg-purple-light': active || selected }"
          >
            {{ option.label }}
          </li>
        </ComboboxOption>
        <li
          v-if="filteredOptions.length === 0"
          role="presentation"
          class="flex p-3 text-grey-dark"
        >
          {{ emptyMessage }}
        </li>
      </ComboboxOptions>
    </div>
    <p
      v-if="error"
      :id="`${name}-error`"
      class="mt-1 text-red-800"
    >
      {{ error }}
    </p>
  </Combobox>
</template>

<script setup lang="ts">
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { computed, ref } from 'vue'

type Value = string | number
type Option = string | { label: string, value: Value }

const props = withDefaults(defineProps<{
  name: string
  label?: string
  labelClasses?: string
  options: Option[]
  modelValue?: Value | null
  nullable?: boolean
  disabled?: boolean
  placeholder?: string
  leadingIcon?: string
  buttonLabel?: string
  emptyMessage?: string
  error?: string
}>(), {
  modelValue: null,
  nullable: true,
  leadingIcon: 'eva:search-outline',
  buttonLabel: 'Toon opties',
  emptyMessage: 'Geen resultaten gevonden.',
})

const emit = defineEmits<{
  'update:modelValue': [value: Value | null]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}>()

const query = ref('')
const normalizedOptions = computed(() => props.options.map(option =>
  typeof option === 'string' ? { label: option, value: option } : option,
))
const filteredOptions = computed(() => {
  const search = query.value.trim().toLocaleLowerCase()
  return normalizedOptions.value.filter(option => option.label.toLocaleLowerCase().includes(search))
})

function displayValue(value: unknown): string {
  return normalizedOptions.value.find(option => option.value === value)?.label ?? ''
}

function updateQuery(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    query.value = event.target.value
  }
}

function selectOption(value: Value | null) {
  query.value = ''
  emit('update:modelValue', value)
}

function onBlur(event: FocusEvent) {
  query.value = ''
  emit('blur', event)
}
</script>
