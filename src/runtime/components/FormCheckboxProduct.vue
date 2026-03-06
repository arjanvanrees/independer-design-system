<template>
    <label
        class="checkbox group flex flex-col p-4 cursor-pointer border border-grey-light rounded-lg transition-all hover:border-grey"
        :class="{ '!border-green ring-1 ring-green': modelValue }" :for="id">
        <div class="flex pb-4">
            <input class="sr-only peer" type="checkbox" :id="id" :name="name" :value="value" :ref="name"
                :checked="modelValue" @change="emit('update:modelValue', $event.target.checked)"
                v-on:focus="emit('focus', $event)" />
            <div class="checkbox-icon " />

            <div class="flex flex-col w-full ml-2">
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
    disabled: Boolean,
    advice: String,
    tooltip: Boolean,
    labelSecondary: String,
    price: String,
    modelValue: Boolean,
});

const slots = useSlots();
const slotPassed = !!slots.default;
</script>
