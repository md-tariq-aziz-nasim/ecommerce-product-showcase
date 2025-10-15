import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const addToCart = (product) => {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (id) => {
    items.value = items.value.filter(i => i.id !== id)
  }

  const subtotal = computed(() =>
    items.value.reduce((t, i) => t + i.price * i.quantity, 0).toFixed(2)
  )

  return { items, addToCart, removeFromCart, subtotal }
})
