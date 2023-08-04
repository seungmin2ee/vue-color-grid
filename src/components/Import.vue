<template>
  <div class="row justify-center">
    <label for="file" class="file-label">
      Import
      <input ref="inputFile" type="file" id="file" @change="handleImport()">
    </label>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTileStore } from '../store'

const inputFile = ref()
const tileStore = useTileStore()
const { tiles } = storeToRefs(tileStore)

const handleImport = () => {
  const file = inputFile.value.files[0]
  const fileReader = new FileReader()
  
  fileReader.onload = (() => {
    tiles.value = fileReader.result
  })
  
  fileReader.readAsText(file)
}
</script>

<style scoped>
.file-label {
  width: 300px;
  padding: var(--space-md);
  background-color: #ccc;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}

#file {
  display: none;
}
</style>
