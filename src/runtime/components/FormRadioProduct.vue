<template>
    <label
        class="radio group flex flex-col p-4 cursor-pointer bg-white border border-grey-light rounded-lg transition-all"
        :class="{ '!border-green ring-1 ring-green': value === modelValue }" :for="id">
        <div class="flex">
            <input class="sr-only peer" type="radio" :id="id" :name="name" :value="value" :ref="name"
                :checked="value === modelValue" :disabled="disabled"
                @change="emit('update:modelValue', $event.target.value)" />
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
            <div class="flex flex-col w-full pb-4">
                <div class="flex">
                    <span class="font-serif text-purple-dark font-bold" :class="{ 'text-grey-dark': disabled }">{{ label
                        }}</span>

                    <Icon v-if="tooltip" name="eva:info-outline" class="ml-2 cursor-pointer text-grey-dark" />

                    <LabelAdvice v-if="advice" class="ml-auto" :label="advice" />
                </div>

                <p v-if="labelSecondary" class="text-grey-dark">{{ labelSecondary }}</p>

                <p v-if="price" class="font-semibold text-grey-darker">{{ price }}</p>
            </div>
        </div>

        <slot />
    </label>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'focus']);

defineProps({
    id: String,
    name: String,
    label: String,
    value: String,
    modelValue: [String, Boolean],
    checked: Boolean,
    disabled: Boolean,
    advice: String,
    tooltip: Boolean,
    labelSecondary: String,
    price: String,
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