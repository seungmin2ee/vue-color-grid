import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTileStore = defineStore('tile', () => {
  const tiles = ref([])

  return { tiles }
})
