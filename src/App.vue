<template>
  <div>
    <nav class="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">VueShop</h1>
      <button @click="toggleCart" class="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
        Cart ({{ cart.items.length }})
      </button>
    </nav>

    <ProductList v-if="!showCart" />
    <Cart v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from './stores/cart'
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'

const showCart = ref(false)
const cart = useCartStore()
const toggleCart = () => showCart.value = !showCart.value
</script>
