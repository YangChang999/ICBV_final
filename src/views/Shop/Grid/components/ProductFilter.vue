<template>
  <b-accordion class="accordion-alt mb-5" id="accordionExample">
    <!-- Categories Filter -->
    <b-accordion-item titleTag="h2" :visible="true" title="Categories" buttonClass="fs-6 fw-semibold">
      <form class="accordion-body">
        <div
          class="form-check"
          :class="idx && 'mt-2'"
          v-for="(item, idx) in categories"
          :key="idx"
        >
        <!-- Bind the category ID as the value -->
          <input
            class="form-check-input"
            type="checkbox"
            :value="item.id" 
            :id="`category${idx}`"
            v-model="selectedCategoryIds"
            @change="emitFilters"
          />
          <label class="form-check-label heading-color" :for="`category${idx}`">
            {{ item.name }}
          </label>
        </div>
      </form>
    </b-accordion-item>

    <!-- Price Range Filter -->
    <b-accordion-item titleTag="h2" title="Price" buttonClass="fs-6 fw-semibold">
      <form class="accordion-body">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            :value="{ min: 0, max: 200 }"
            id="price1"
            v-model="selectedPriceRange"
            @change="emitFilters"
          />
          <label class="form-check-label heading-color" for="price1">{{ currency }}0 to {{ currency }}200</label>
        </div>
        <div class="form-check mt-2">
          <input
            class="form-check-input"
            type="radio"
            :value="{ min: 200, max: 500 }"
            id="price2"
            v-model="selectedPriceRange"
            @change="emitFilters"
          />
          <label class="form-check-label heading-color" for="price2">{{ currency }}200 to {{ currency }}500</label>
        </div>
        <div class="form-check mt-2">
          <input
            class="form-check-input"
            type="radio"
            :value="{ min: 500, max: 1500 }"
            id="price3"
            v-model="selectedPriceRange"
            @change="emitFilters"
          />
          <label class="form-check-label heading-color" for="price3">{{ currency }}500 to {{ currency }}1500</label>
        </div>
        <div class="form-check mt-2">
          <input
            class="form-check-input"
            type="radio"
            :value="{ min: 1500, max: null }"
            id="price4"
            v-model="selectedPriceRange"
            @change="emitFilters"
          />
          <label class="form-check-label heading-color" for="price4">{{ currency }}1500 to more</label>
        </div>
      </form>
    </b-accordion-item>
  </b-accordion>

  <div class="d-flex justify-content-between p-2 p-xl-0 mt-xl-3 mt-3">
    <b-button variant="link" class="text-primary-hover p-0 mb-0" @click="clearFilters">Clear all</b-button>
    <b-button variant="primary" class="mb-0" @click="emitFilters">Filter Result</b-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { currency } from '@/helpers';

// Define category list with ID mappings
const categories = ref([
  { id: 1, name: 'Super Foods' },
  { id: 2, name: 'Household Care' },
  { id: 3, name: 'Food Supplements' },
]);

// State for selected filters
const selectedCategoryIds = ref<number[]>([]); // Use category IDs
const selectedPriceRange = ref<{ min: number; max: number | null } | null>(null);

// Define emit function
const emit = defineEmits(['filterChange']);

// Emit event to the parent with current filter values
const emitFilters = () => {
  const filters = {
    categories: selectedCategoryIds.value, // Send category IDs instead of names
    priceMin: selectedPriceRange.value?.min || null,
    priceMax: selectedPriceRange.value?.max || null,
  };
  emit('filterChange', filters); // Use emit function
};

// Clear all selected filters
const clearFilters = () => {
  selectedCategoryIds.value = [];
  selectedPriceRange.value = null;
  emitFilters();
};
</script>
