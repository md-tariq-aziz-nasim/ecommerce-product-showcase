<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">🛒 E-Commerce Product Showcase</h1>

    <!-- Search & Filter -->
    <div class="flex flex-col md:flex-row gap-4 mb-6 justify-between">
      <input v-model="search" placeholder="Search product..."
        class="border rounded-lg p-2 w-full md:w-1/2 focus:outline-none" />
      <select v-model="category" class="border rounded-lg p-2">
        <option value="">All Categories</option>
        <option v-for="c in categories" :key="c">{{ c }}</option>
      </select>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="product in filteredProducts" :key="product.id"
        class="border rounded-xl p-4 shadow hover:shadow-lg transition">
        <img :src="product.image" alt="" class="w-full h-48 object-contain mb-4" />
        <h2 class="font-semibold line-clamp-2 mb-2">{{ product.title }}</h2>
        <p class="text-gray-600 text-sm mb-2">{{ product.category }}</p>
        <p class="text-lg font-bold mb-4">${{ product.price }}</p>
        <button @click="addToCart(product)"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'

const products = ref([])
const categories = ref([])
const search = ref('')
const category = ref('')
const cart = useCartStore()

const addToCart = (product) => {
  cart.addToCart(product)
}

onMounted(async () => {
  const res = await axios.get('https://fakestoreapi.com/products')
  products.value = res.data
  categories.value = [...new Set(res.data.map(p => p.category))]
})

const filteredProducts = computed(() => {
  return products.value.filter(p =>
    p.title.toLowerCase().includes(search.value.toLowerCase()) &&
    (category.value ? p.category === category.value : true)
  )
})
</script>
