<template>
  <div class="bg-white border-b border-b-purple-light">
    <div class="grid-container flex flex-row items-center !px-2 py-2 tablet:!px-4 desktop:py-4 desktop:!px-10">
      <IMenuButton v-if="compact === false" :state="modalProducts" @toggle="toggleModalProducts()"
        class="desktop:hidden">
        <Icon name="eva:menu-outline" />
      </IMenuButton>

      <NuxtLink to="/" class="ml-2 desktop:ml-0">
        <ILogo size="medium" class="desktop:w-58" />
      </NuxtLink>

      <ul class="flex w-full desktop:hidden">
        <li class="ml-auto">
          <IMenuButton>
            <Icon name="eva:message-circle-outline" />
          </IMenuButton>
        </li>

        <li>
          <IMenuButton :state="modalAccount" @toggle="toggleModalAccount">
            <template v-if="user.loggedIn">
              <Icon name="eva:person-done-outline" />
            </template>

            <template v-else>
              <Icon name="eva:person-delete-outline" />
            </template>
          </IMenuButton>
        </li>
      </ul>

      <ul class="hidden desktop:flex gap-1 w-full">
        <li v-if="compact === false" class="hidden desktop:block">
          <IMenuButton :state="products" @toggle="toggleProducts">
            Producten
          </IMenuButton>

          <div v-if="products" class="absolute z-20 flex mt-2 drop-shadow-lg">
            <IMenuProducts :verzekeringen="verzekeringen" :energie="energie" @toggle-verzekeringen="toggleVerzekeringen"
              @toggle-energie="toggleEnergie" />

            <IMenuVerzekeringen v-if="verzekeringen" />

            <IMenuEnergie v-if="energie" />
          </div>
        </li>

        <li v-if="compact === false" class="hidden desktop:block">
          <IMenuButton :state="kennis" @toggle="toggleKennis">
            Kennis & tools
          </IMenuButton>

          <div v-if="kennis" class="absolute z-20 flex mt-2 drop-shadow-lg">
            <IMenuKennis :kennisbank="kennisbank" @toggle-kennisbank="toggleKennisbank" />

            <IMenuKennisbank v-if="kennisbank" />
          </div>
        </li>

        <li v-if="compact === false" class="hidden desktop:block">
          <IMenuButton :state="klantenservice" @toggle="toggleKlantenservice">
            Klantenservice
          </IMenuButton>

          <div v-if="klantenservice" class="absolute z-20 flex mt-2 drop-shadow-lg">
            <IMenuKlantenservice />
          </div>
        </li>

        <li class="relative ml-auto">
          <IMenuButton :icon="false">
            <Icon name="eva:message-circle-outline" />
            Stel je vraag
          </IMenuButton>
        </li>

        <li class="relative">
          <IMenuButton :state="account" v-if="user.loggedIn" @toggle="toggleAccount">
            <Icon name="eva:person-done-outline" />
            <span class="hidden desktop:block">{{ user.name }}</span>
          </IMenuButton>

          <IMenuButton v-if="!user.loggedIn" :icon="false" @click.prevent="user.toggleDialogLogin">
            <Icon name="eva:person-delete-outline" />
            <span class="hidden desktop:block">Inloggen</span>
          </IMenuButton>

          <div v-if="account" class="absolute right-0 z-20 flex mt-2 rounded-lg drop-shadow-lg">
            <IMenuAccount :user="user" />
          </div>
        </li>
      </ul>
    </div>
  </div>

  <IStepsIndicator v-if="steps" :steps="stepOptions" />

  <LazyIModal :show="modalProducts" :show-back="verzekeringen || energie || kennis || kennisbank || klantenservice"
    @back="backModal" @close="toggleModalProducts">
    <template v-if="!verzekeringen && !energie && !kennis && !kennisbank && !klantenservice">
      <IMenuProducts :verzekeringen="verzekeringen" :energie="energie" :kennis="kennis" :klantenservice="klantenservice"
        @toggle-verzekeringen="toggleVerzekeringen" @toggle-energie="toggleEnergie" @toggle-kennis="toggleKennis"
        @toggle-klantenservice="toggleKlantenservice" />
    </template>

    <IMenuVerzekeringen v-if="verzekeringen" />

    <IMenuEnergie v-if="energie" />

    <IMenuKennis v-if="kennis" :kennisbank="kennisbank" @toggle-kennisbank="toggleKennisbank" />

    <IMenuKennisbank v-if="kennisbank" />

    <IMenuKlantenservice v-if="klantenservice" />
  </LazyIModal>

  <LazyIModal :show="modalAccount" @close="toggleModalAccount">
    <IMenuAccount :user="user" />
  </LazyIModal>
</template>

<script setup>
const props = defineProps({
  compact: Boolean,
  steps: Boolean,
  domain: String,
  user: {
    type: Object,
    default: () => ({
      loggedIn: false,
      name: 'Arjan van Rees',
      toggleDialogLogin: () => { },
      toggleLogin: () => { }
    })
  }
});

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

const stepOptions = computed(() => {
  if (props.domain === 'fiets') {
    return [
      {
        number: 1,
        label: '1. Gegevens',
        path: `/${props.domain}/gegevens`,
      },
      {
        number: 2,
        label: '2. Aanvragen',
        path: `/${props.domain}/aanvragen`,
      }
    ]
  } else {
    return [
      {
        number: 1,
        label: '1. Gegevens',
        path: `/${props.domain}/gegevens`,
      },
      {
        number: 2, 
        label: '2. Resultaten',
        path: `/${props.domain}/resultaten`
      },
      {
        number: 3,
        label: '3. Aanvragen',
        path: `/${props.domain}/aanvragen`,
      }
    ]
  }
})
</script>