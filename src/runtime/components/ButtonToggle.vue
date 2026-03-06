<template>
    <button class="text-purple font-semibold transition-all cursor-pointer hover:text-purple-dark">
        <Transition name="fade" mode="out-in">
            <div v-if="state === false" class="flex gap-2">
                <Icon v-if="iconPrimary" :name="iconPrimary" />
                {{ labelPrimary }}
            </div>
    
            <div v-else class="flex gap-2">
                <Icon v-if="iconSecondary" :name="iconSecondary" />
                {{ labelSecondary }}
            </div>
        </Transition>
    </button>
</template>

<script setup>
defineProps({
  state: Boolean,
  iconPrimary: String,
  labelPrimary: String,
  iconSecondary: String,
  labelSecondary: String,
});
</script>