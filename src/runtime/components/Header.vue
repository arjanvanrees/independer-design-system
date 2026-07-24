<template>
  <header class="bg-white border-b border-b-purple-light">
    <div :class="['flex flex-row items-center !px-2 py-2 tablet:!px-4 desktop:py-4 desktop:!px-8 desktop-lg:!px-10', { 'w-full': fullWidth, 'grid-container': !fullWidth }]">
      <IndMenuButton
        v-if="compact === false"
        :state="modalProducts"
        class="desktop:hidden"
        @toggle="toggleModalProducts()"
      >
        <Icon name="eva:menu-outline" />
      </IndMenuButton>

      <NuxtLink
        to="/"
        class="ml-2 desktop:ml-0"
      >
        <IndLogo
          size="medium"
          class="desktop:w-58"
        />
      </NuxtLink>

      <ul class="flex ml-auto desktop:hidden">
        <li v-if="contact === true">
          <IndMenuButton>
            <Icon name="eva:message-circle-outline" />
          </IndMenuButton>
        </li>

        <li>
          <IndMenuButton
            :state="modalAccount"
            @toggle="toggleModalAccount"
          >
            <template v-if="user.loggedIn">
              <Icon name="eva:person-done-outline" />
            </template>

            <template v-else>
              <Icon name="eva:person-delete-outline" />
            </template>
          </IndMenuButton>
        </li>
      </ul>

      <ul class="hidden desktop:flex gap-1">
        <li
          v-if="compact === false"
          class="hidden desktop:block"
        >
          <IndMenuButton
            :state="products"
            @toggle="toggleProducts"
          >
            Producten
          </IndMenuButton>

          <div
            v-if="products"
            v-on-click-outside="toggleProducts"
            class="absolute z-30 flex mt-2 drop-shadow-lg"
          >
            <IndMenuProducts
              :verzekeringen="verzekeringen"
              :energie="energie"
              @toggle-verzekeringen="toggleVerzekeringen"
              @toggle-energie="toggleEnergie"
            />

            <IndMenuVerzekeringen v-if="verzekeringen" />

            <IndMenuEnergie v-if="energie" />
          </div>
        </li>

        <li
          v-if="compact === false"
          class="hidden desktop:block"
        >
          <IndMenuButton
            :state="kennis"
            @toggle="toggleKennis"
          >
            Kennis & tools
          </IndMenuButton>

          <div
            v-if="kennis"
            v-on-click-outside="toggleKennis"
            class="absolute z-30 flex mt-2 drop-shadow-lg"
          >
            <IndMenuKennis
              :kennisbank="kennisbank"
              @toggle-kennisbank="toggleKennisbank"
            />

            <IndMenuKennisbank v-if="kennisbank" />
          </div>
        </li>

        <li
          v-if="compact === false"
          class="hidden desktop:block"
        >
          <IndMenuButton
            :state="klantenservice"
            @toggle="toggleKlantenservice"
          >
            Klantenservice
          </IndMenuButton>

          <div
            v-if="klantenservice"
            v-on-click-outside="toggleKlantenservice"
            class="absolute z-30 flex mt-2 drop-shadow-lg"
          >
            <IndMenuKlantenservice />
          </div>
        </li>
      </ul>

      <ul class="hidden desktop:flex gap-1 ml-auto">
        <li
          v-if="contact === true"
          class="relative"
        >
          <IndMenuButton :icon="false">
            <Icon name="eva:message-circle-outline" />
            Stel je vraag
          </IndMenuButton>
        </li>

        <li class="relative">
          <IndMenuButton
            v-if="user.loggedIn"
            :state="account"
            @toggle="toggleAccount"
          >
            <Icon name="eva:person-done-outline" />
            <span class="hidden desktop:block">{{ user.name }}</span>
          </IndMenuButton>

          <IndMenuButton
            v-if="!user.loggedIn"
            :icon="false"
            @toggle="toggleAccount"
          >
            <Icon name="eva:person-delete-outline" />
            <span class="hidden desktop:block">Inloggen</span>
          </IndMenuButton>

          <div
            v-if="account"
            v-on-click-outside="toggleAccount"
            class="absolute right-0 z-30 flex mt-2 rounded-lg drop-shadow-lg"
          >
            <IndMenuAccount />
          </div>
        </li>
      </ul>
    </div>

    <IndStepsIndicator :steps="steps" />

    <LazyIndModal
      :show="modalProducts"
      :show-back="verzekeringen || energie || kennis || kennisbank || klantenservice"
      @back="backModal"
      @close="toggleModalProducts"
    >
      <template v-if="!verzekeringen && !energie && !kennis && !kennisbank && !klantenservice">
        <IndMenuProducts
          :verzekeringen="verzekeringen"
          :energie="energie"
          :kennis="kennis"
          :klantenservice="klantenservice"
          @toggle-verzekeringen="toggleVerzekeringen"
          @toggle-energie="toggleEnergie"
          @toggle-kennis="toggleKennis"
          @toggle-klantenservice="toggleKlantenservice"
        />
      </template>

      <IndMenuVerzekeringen v-if="verzekeringen" />

      <IndMenuEnergie v-if="energie" />

      <IndMenuKennis
        v-if="kennis"
        :kennisbank="kennisbank"
        @toggle-kennisbank="toggleKennisbank"
      />

      <IndMenuKennisbank v-if="kennisbank" />

      <IndMenuKlantenservice v-if="klantenservice" />
    </LazyIndModal>

    <LazyIndModal
      :show="modalAccount"
      @close="toggleModalAccount"
    >
      <IndMenuAccount />
    </LazyIndModal>
  </header>
</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components'

defineProps({
  compact: Boolean,
  fullWidth: Boolean,
  contact: {
    type: Boolean,
    default: true,
  },
  steps: {
    type: Array,
    default: () => ([
      {
        number: 1,
        label: '1. Gegevens',
        path: `/`,
      },
    ]),
  },
  domain: String,
  user: {
    type: Object,
    default: () => ({
      loggedIn: false,
      name: 'Arjan',
    }),
  },
})

const modalProducts = ref(false)
const modalAccount = ref(false)

const products = ref(false)
const verzekeringen = ref(false)
const energie = ref(false)
const kennisbank = ref(false)
const kennis = ref(false)
const klantenservice = ref(false)
const account = ref(false)

const toggleModalProducts = () => {
  modalProducts.value = !modalProducts.value
}

const toggleModalAccount = () => {
  modalAccount.value = !modalAccount.value
}

const backModal = () => {
  verzekeringen.value = false
  kennis.value = false
  energie.value = false
  kennisbank.value = false
  klantenservice.value = false
}

const toggleProducts = () => {
  products.value = !products.value

  verzekeringen.value = false
  energie.value = false
  kennis.value = false
}

const toggleVerzekeringen = () => {
  verzekeringen.value = !verzekeringen.value

  kennis.value = false
  energie.value = false
}

const toggleEnergie = () => {
  energie.value = !energie.value

  verzekeringen.value = false
}

const toggleKennis = () => {
  kennis.value = !kennis.value
}

const toggleKennisbank = () => {
  kennisbank.value = !kennisbank.value
}

const toggleKlantenservice = () => {
  klantenservice.value = !klantenservice.value
}

const toggleAccount = () => {
  account.value = !account.value
}
</script>
