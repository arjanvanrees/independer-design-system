<template>
  <footer class="w-full bg-white border-t border-t-purple-light">
    <div class="grid-container flex flex-col items-center gap-6 py-6">
      <IndLogo size="small" />

      <div class="flex flex-wrap justify-center gap-4 desktop:gap-6 text-sm">
        <NuxtLink
          to="#"
          class="text-grey-darkest shrink-0 hover:text-grey-darkest hover:underline"
        >
          Dienstverlening
        </NuxtLink>

        <NuxtLink
          to="#"
          class="text-grey-darkest shrink-0  hover:text-grey-darkest hover:underline "
        >
          Cookiebeleid
        </NuxtLink>

        <NuxtLink
          to="#"
          class="text-grey-darkest shrink-0  hover:text-grey-darkest hover:underline "
        >
          Privacy
        </NuxtLink>

        <NuxtLink
          to="#"
          class="text-grey-darkest shrink-0  hover:text-grey-darkest hover:underline"
        >
          Disclaimer
        </NuxtLink>

        <NuxtLink
          to="#"
          class="text-grey-darkest shrink-0  hover:text-grey-darkest hover:underline"
        >
          Gebruiksvoorwaarden
        </NuxtLink>

        <NuxtLink
          to="#"
          class="text-grey-darkest shrink-0  hover:text-grey-darkest hover:underline"
        >
          Respsonsible disclosure
        </NuxtLink>

        <NuxtLink
          to="#"
          class="text-grey-darkest shrink-0  hover:text-grey-darkest hover:underline"
        >
          Redactioneel beleid
        </NuxtLink>

        <NuxtLink
          to="#"
          class="text-grey-darkest shrink-0  hover:text-grey-darkest hover:underline"
        >
          Auteursrecht
        </NuxtLink>
      </div>

      <IndButton
        v-if="reset"
        tone="wire-purple"
        label="Begin opnieuw"
        icon="eva:trash-2-outline"
        @click.prevent="reset"
      />
    </div>
  </footer>
</template>

<script setup>
defineProps({
  reset: {
    type: Function,
    required: false,
  },
})
</script>
