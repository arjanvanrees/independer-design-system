<template>
  <main class="min-h-screen bg-interface px-4 py-8 text-grey-1000 tablet:px-8">
    <div class="mx-auto max-w-4xl">
      <header class="mb-8">
        <h1 class="h1">
          DS2 Vue Components
        </h1>
      </header>

      <IndFormFieldset class="mb-4 rounded-xl bg-white p-4 shadow-sm tablet:p-6" title="Persoonlijke gegevens" :step="true" :section="{ state: 'editing'}">
        <template #editing>
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
              type="number"
              inputmode="numeric"
              min="0"
              steps
              @step-up="form.amount += 100"
              @step-down="form.amount = Math.max(0, form.amount - 100)"
            />
          </IndFormRow>

          <IndFormRow>
            <IndFormTextarea
              v-model="form.notes"
              name="notes"
              label="Opmerkingen"
              placeholder="Voeg hier je opmerkingen toe"
            />
          </IndFormRow>
        </template>
      </IndFormFieldset>

      <IndFormFieldset class="rounded-xl bg-white p-4 shadow-sm tablet:p-6" title="Voorkeuren" :step="true" :section="{ state: 'editing'}">
        <template #editing>
          <IndFormRow>
            <IndFormTabs
              v-model="form.customerType"
              :options="customerTypeOptions"
            />
          </IndFormRow>
    
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
          />

          <IndFormCheckbox
            id="newsletter"
            v-model="form.newsletter"
            name="newsletter"
            label="Stuur mij productupdates"
            advice
          >
            <span class="mt-1 text-grey-dark">
              Handig voor wijzigingen in dekking en voorwaarden.
            </span>
          </IndFormCheckbox>

          <IndFormCheckbox
            id="terms"
            v-model="form.terms"
            name="terms"
            label="Ik ga akkoord met de voorwaarden"
          />
        </template>
      </IndFormFieldset>

      <div class="mt-8 flex flex-wrap items-center gap-4">
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
      </div>
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
  notes: '',
  customerType: 'new',
  contact: 'email',
  newsletter: true,
  terms: false,
})

const showSummary = ref(false)

const productOptions = [
  { label: 'Autoverzekering', value: 'car-insurance' },
  { label: 'Zorgverzekering', value: 'health-insurance' },
  { label: 'Hypotheek', value: 'mortgage' },
]

const customerTypeOptions = [
  { id: 'customer-new', name: 'customer-type', label: 'Nieuw', value: 'new' },
  { id: 'customer-existing', name: 'customer-type', label: 'Bestaand', value: 'existing' },
]
</script>
