<template>
  <fieldset
    class="card w-full shrink-0 grow-0 mb-4 p-4 rounded-xl tablet:p-6 transition-all shadow-sm scroll-mt-6 tablet:scroll-mt-8"
    ref="sectionRef" :class="classesCard">
    <header v-if="title" class="flex items-start border-b-grey-light" :class="classesHeader">
      <div v-if="step" class="hexagon w-7 h-7 tablet:w-8 tablet:h-8 mr-2 tablet:mr-4 z-10" :class="classesHexagon">
      </div>

      <h3 class="transition-all" :class="classesTitle">
        {{ title }}
      </h3>

      <button v-if="section.state === 'saved'" class="!p-0 text-purple hover:text-purple-dark ml-auto"
        @click.prevent="emit('click-edit', $event)">
        <Icon name="eva:edit-outline" />
      </button>
    </header>

    <div class="desktop:mx-12">
      <Collapse :when="section.state === 'saved'" class="v-collapse">
        <slot name="saved" />
      </Collapse>

      <Collapse :when="section.state === 'editing'" class="v-collapse">
        <slot name="editing" />
      </Collapse>
    </div>
  </fieldset>
</template>

<script setup>
import { Collapse } from 'vue-collapsed'

const emit = defineEmits(['click-edit']);

const props = defineProps({
  title: String,
  step: Boolean,
  section: {
    type: Object,
    default: () => ({ state: 'editing' }),
    required: false
  },
  name: String,
});

const sectionRef = ref(null);

const classesCard = computed(() => {
  return {
    'editing': 'card--editing bg-white',
    'saved': 'card--saved bg-white',
    'closed': 'card--closed bg-white cursor-not-allowed',
  }[props.section.state];
});

const classesHeader = computed(() => {
  return {
    'editing': 'pb-4',
    'saved': 'pb-4',
    'closed': '!mb-0',
  }[props.section.state];
});

const classesTitle = computed(() => {
  return {
    'editing': 'text-purple-dark',
    'saved': 'text-purple-dark',
    'closed': '!text-grey-dark',
  }[props.section.state];
});

const classesHexagon = computed(() => {
  return {
    'editing': 'hexagon--editing',
    'saved': 'hexagon--saved',
    'closed': 'hexagon--closed',
  }[props.section.state];
});

watch(() => props.section.state, (value) => {
  if (value === 'editing') {
    setTimeout(() => {
      sectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 400)
  }
})
</script>

<!-- <style>
@reference '../assets/styles/index.css';

.card {
  position: relative;
}

@media screen and (min-width: 1136px) {
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 39.5px;
    width: 1px;
    height: 100%;
    z-index: 2;
    @apply bg-purple-light transition-all;
  }

  .card--first::before {
    top: 32px;
    height: calc(100% - 32px);
  }

  .card--last::before {
    height: 32px;
  }
}

.hexagon {
  background: center / contain no-repeat url('~/assets/images/number-hexagon-saved.svg');

  @apply transition-all
}

.hexagon--editing {
  background-image: url('~/assets/images/number-hexagon-editing.svg');
}

.hexagon--saved {
  background-image: url('~/assets/images/number-hexagon-saved.svg');
}

.hexagon--closed {
  background-image: url('~/assets/images/number-hexagon-closed.svg');
}
</style> -->