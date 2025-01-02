<template>
  <section class="pt-0">
    <b-container>
      <b-row>
        <aside class="col-xl-3">
          <div class="flex-column p-3 p-xl-0 d-none d-xl-block">
            <ProductFilter @filterChange="applyFilters" />
          </div>
          <b-offcanvas
            v-model="offcanvas"
            placement="end"
            title="Advanced Filter"
            headerClass="bg-light"
            bodyClass="flex-column p-3 p-xl-0"
            class="offcanvas-xl"
            tabindex="-1"
            id="offcanvasSidebar"
            aria-labelledby="offcanvasSidebarLabel"
          >
            <ProductFilter />
          </b-offcanvas>
        </aside>

        <b-col xl="9" class="ps-xl-6">
          <form class="row g-2 g-xl-4 mb-4">
            <b-col sm="6" md="3" class="d-grid d-xl-none">
              <button
                @click="toggleOffcanvas"
                class="btn btn-dark mb-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSidebar"
                aria-controls="offcanvasSidebar"
              >
                <font-awesome-icon :icon="faSlidersH" class="me-1" /> Show filter
              </button>
            </b-col>
          </form>

          <b-row class="g-4 g-lg-5">
            <!-- Dynamic product rendering -->
            <template v-if="!loading" v-for="(product, idx) in productGrid" :key="idx">
              <b-col sm="6" lg="4">
                <ProductCard :product="product" />
              </b-col>
            </template>
            <div v-else>Loading products...</div>
          </b-row>

          <!-- <ul class="pagination pagination-primary-soft d-flex justify-content-end mb-0 mt-5">
            <li>
              <ul class="list-unstyled">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Prev</a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">..</a></li>
                <li class="page-item"><a class="page-link" href="#">22</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </li>
          </ul> -->
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ProductCard from '@/views/Shop/Grid/components/ProductCard.vue'
import ProductFilter from '@/views/Shop/Grid/components/ProductFilter.vue'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { BIconSearch } from 'bootstrap-icons-vue'

import shopBackground5 from '@/assets/images/shop/bg/05.jpg'

//axios.defaults.baseURL = 'http://localhost:3000';

const offcanvas = ref(false);
const productGrid = ref([]); // Dynamic product list
const loading = ref(true); // Loading state

// Toggle offcanvas function
const toggleOffcanvas = () => {
  offcanvas.value = !offcanvas.value;
};

// Fetch products from the server
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/products/'); // Replace with your actual API URL
    
    // Sanitize the product data
    
    productGrid.value = response.data.map((product: { name:string, price: string }) => ({
      ...product,
    
      price: parseFloat(product.price) || 0, // Ensure price is a number
    }));
    //console.log(response);
    console.log('Product:', productGrid.value[0]);
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false; // Stop loading after fetching
  }
};

const applyFilters = (filters) => {
  loading.value = true;

  // Convert filters to query parameters
  const query = new URLSearchParams(filters).toString();
  console.log("query is" + query);
  // Fetch products based on filters
  axios
    .get(`http://localhost:3000/products?${query}`)
    .then((response) => {
      productGrid.value = response.data;
    })
    .catch((error) => {
      console.error('Error fetching filtered products:', error);
    })
    .finally(() => {
      loading.value = false;
    });
};


// Fetch products when the component is mounted
onMounted(() => {
  fetchProducts()
  
})

// Options for sorting (if needed in the future)
const selected = ref(null)
const options = [
  { value: null, text: 'Sort by' },
  { value: 'Name', text: 'Name' },
  { value: 'Low to High Price', text: 'Low to High Price' },
  { value: 'High to Low Price', text: 'High to Low Price' }
]
</script>
