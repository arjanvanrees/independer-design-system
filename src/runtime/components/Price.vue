<template>
    <div class="flex items-start justify-end">
        <div class="text-right">
            <div v-if="period" :class="{ 'text-grey-darkest': mode === 'light', 'text-grey-darkest': mode === 'dark' }">
                {{ period }}
            </div>

            <div class="flex items-start justify-end font-semibold">
                <div :class="{ 'text-xl leading-6': size === 'small', 'text-[32px] leading-none': size === 'medium', 'text-[48px] leading-none': size === 'large' }">{{ premium.euro }}</div>
                <div :class="{ 'text-xs leading-5': size === 'small', 'text-[16px] leading-none mt-1': size === 'medium', 'text-[24px] leading-none mt-1': size === 'large' }">,{{ premium.cent }}</div>
            </div>

            <div v-if="closable === false" class="text-grey-dark">
                Niet bij ons te koop
            </div>

            <div v-if="discount">
                <div class="text-purple underline underline-offset-4 decoration-1 decoration-dotted cursor-pointer" @click.prevent="emit('discount')">Incl. € {{ discount.euro }},{{ discount.cent }} korting</div>
            </div>

            <div v-if="savings">
                <div class="text-green-dark">Bespaar € {{ savings.euro }},{{ savings.cent }}/jr</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['discount']);

defineProps({
    period: {
        type: String,
        default: 'Geschat per maand',
    },
    premium: {
        type: Object,
        default: null,
    },
    closable: {
        type: Boolean,
        default: true,
    },
    discount: {
        type: Object,
        default: null,
    },
    size: {
        type: String,
        default: 'large',
    },
    savings: {
        type: Object,
        default: null,
    },
    mode: {
        type: String,
        default: 'light',
    },
});
</script>