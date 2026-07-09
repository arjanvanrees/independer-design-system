<template>
  <main class="min-h-screen bg-interface px-4 py-8 text-grey-1000 tablet:px-8">
    <div class="mx-auto max-w-4xl">
      <header class="mb-8">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-purple">
          Ind Design System
        </p>
        <h1 class="font-serif text-3xl font-bold text-purple-dark tablet:text-5xl">
          Base form components
        </h1>
      </header>

      <section class="mb-4 rounded-xl bg-white p-4 shadow-sm tablet:p-6">
        <h2 class="mb-4 font-serif text-2xl font-bold text-purple-dark">
          Persoonlijke gegevens
        </h2>

        <IndFormRow grid>
          <IndFormInput
            v-model="form.firstName"
            class="col-span-2"
            name="first-name"
            label="Voornaam"
            placeholder="Arjan"
            autocomplete="given-name"
            type="text"
          />

          <IndFormInput
            v-model="form.lastName"
            class="col-span-2"
            name="last-name"
            label="Achternaam"
            placeholder="Van Rees"
            autocomplete="family-name"
            type="text"
          />
        </IndFormRow>

        <IndFormRow grid>
          <IndFormSelect
            v-model="form.product"
            class="col-span-2"
            name="product"
            label="Product"
            leading-icon="eva:briefcase-outline"
            :options="productOptions"
            default-option="Kies een product"
          />

          <IndFormInput
            v-model="form.amount"
            class="col-span-2"
            name="amount"
            label="Bedrag"
            leading-icon="eva:credit-card-outline"
            trailing-icon="eva:hash-outline"
            type="number"
            inputmode="numeric"
            min="0"
            steps
            @step-up="form.amount += 100"
            @step-down="form.amount = Math.max(0, form.amount - 100)"
          />
        </IndFormRow>

        <IndFormRow>
          <IndFormAutocomplete
            v-model="form.city"
            name="city"
            label="Woonplaats"
            placeholder="Zoek een plaats"
            :options="cityOptions"
          />
        </IndFormRow>
      </section>

      <section class="rounded-xl bg-white p-4 shadow-sm tablet:p-6">
        <h2 class="mb-4 font-serif text-2xl font-bold text-purple-dark">
          Voorkeuren
        </h2>

        <IndFormRow>
          <IndFormTabs
            v-model="form.customerType"
            :options="customerTypeOptions"
          />
        </IndFormRow>

        <IndFormRow grid>
          <div class="col-span-2">
            <IndFormRadio
              id="contact-email"
              v-model="form.contact"
              name="contact"
              label="E-mail"
              value="email"
              advice
              advice-label="Snelst"
            />
            <IndFormRadio
              id="contact-phone"
              v-model="form.contact"
              name="contact"
              label="Telefoon"
              value="phone"
              number="2 werkdagen"
            />
          </div>

          <div class="col-span-2">
            <IndFormCheckbox
              id="newsletter"
              v-model="form.newsletter"
              name="newsletter"
              label="Stuur mij productupdates"
              advice
            >
              <span class="mt-1 text-sm text-grey-dark">
                Handig voor wijzigingen in dekking en voorwaarden.
              </span>
            </IndFormCheckbox>

            <IndFormCheckbox
              id="terms"
              v-model="form.terms"
              name="terms"
              label="Ik ga akkoord met de voorwaarden"
            />
          </div>
        </IndFormRow>
      </section>

      <section class="mt-8 flex flex-wrap items-center gap-4">
        <IndButton
          label="Versturen"
          tone="filled-yellow"
          icon="eva:paper-plane-outline"
        />
        <IndButton
          label="Secundaire actie"
          tone="wire-purple"
        />
        <IndButtonToggle
          :state="showSummary"
          icon-primary="eva:eye-outline"
          label-primary="Toon samenvatting"
          icon-secondary="eva:eye-off-outline"
          label-secondary="Verberg samenvatting"
          @click="showSummary = !showSummary"
        />
      </section>

      <pre
        v-if="showSummary"
        class="mt-6 overflow-auto rounded-lg border border-grey-light bg-white p-4 text-sm"
      >{{ formSummary }}</pre>
    </div>
  </main>
</template>

<script setup>
defineOptions({
  name: 'BaseFormDemoPage',
})

const form = reactive({
  firstName: '',
  lastName: '',
  product: '',
  amount: 1000,
  city: '',
  customerType: 'new',
  contact: 'email',
  newsletter: true,
  terms: false,
})

const showSummary = ref(false)

const formSummary = computed(() => JSON.stringify(form, null, 2))

const productOptions = [
  { label: 'Autoverzekering', value: 'car-insurance' },
  { label: 'Zorgverzekering', value: 'health-insurance' },
  { label: 'Hypotheek', value: 'mortgage' },
]

const cityOptions = [
  { label: 'Amsterdam', value: 'amsterdam' },
  { label: 'Rotterdam', value: 'rotterdam' },
  { label: 'Utrecht', value: 'utrecht' },
]

const customerTypeOptions = [
  { id: 'customer-new', name: 'customer-type', label: 'Nieuw', value: 'new' },
  { id: 'customer-existing', name: 'customer-type', label: 'Bestaand', value: 'existing' },
]
</script>
