<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">🛍 Your Cart</h2>

    <div v-if="cart.items.length === 0" class="text-gray-500">
      Cart is empty.
    </div>

    <div v-else>
      <table class="w-full border-collapse mb-4">
        <thead>
          <tr class="border-b">
            <th class="text-left p-2">Product</th>
            <th class="text-right p-2">Qty</th>
            <th class="text-right p-2">Price</th>
            <th class="text-right p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.items" :key="item.id" class="border-b">
            <td class="p-2">{{ item.title }}</td>
            <td class="p-2 text-right">{{ item.quantity }}</td>
            <td class="p-2 text-right">${{ (item.price * item.quantity).toFixed(2) }}</td>
            <td class="p-2 text-right">
              <button @click="cart.removeFromCart(item.id)" class="text-red-600 hover:underline">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-right font-bold text-xl">
        Subtotal: ${{ cart.subtotal }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
</script>
