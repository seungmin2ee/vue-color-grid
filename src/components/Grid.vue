<template>
  <div class="col column items-center">
    <div class="col column items-center pa-lg gap-xl">
      <div class="row justify-center items-center gap">
        <input v-model="rows" type="text" placeholder="rows">
        *
        <input v-model="columns" type="text" placeholder="columns">
      </div>
      <div class="grid" :style="{'grid-template-rows': `repeat(${rows}, 1fr)`, 'grid-template-columns': `repeat(${columns}, 1fr)`}">
        <!-- <div v-for="i in boxs" :key="i" class="drop-box" :style="{width: `${boxWidth}px`}" @drop.prevent="onDrop($event)" @dragenter.prevent @dragover.prevent></div> -->
        <div v-for="(item, index) in gridInfoRef.flat()" :key="index" class="drop-box" :style="{width: `${boxWidth}px`, background: item}" @drop.prevent="onDrop($event, index)" @dragenter.prevent @dragover.prevent></div>
      </div>
    </div>
    <Export :grid="gridInfoRef" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref, watch, nextTick } from 'vue'
import { useTileStore } from '../store'
import Export from './Export.vue'

// gridInfo.length -> row개수
// gridInfo[0].length -> col개수

// let gridInfo = [['transparent']]
const gridInfoRef = ref([['transparent']])
const rows = ref(1)
const columns = ref(1)
// const boxs = computed(() => columns.value * rows.value)
// const boxWidth = computed(() => 900 / rows.value)
const boxWidth = computed(() => 900 / rows)

const tileStore = useTileStore()
const { tiles } = storeToRefs(tileStore)

watch(tiles, () => {
  const originalTile = JSON.parse(tiles.value)

  rows.value = originalTile.length
  columns.value = originalTile[0].length
  
  nextTick(() => {
    gridInfoRef.value = originalTile
  })
})

watch(rows, (next, prev) => {
  gridInfoRef.value.splice(0, gridInfoRef.value.length)

  for(let i = 0; i < next; i++) {
    gridInfoRef.value.push([])
    
    for(let j = 0; j < columns.value; j++) {
      gridInfoRef.value[i].push('tranparent')
    }
  }
})

watch(columns, (next, prev) => {
  for(let i = 0; i < gridInfoRef.value.length; i++) {
    gridInfoRef.value[i].splice(0, gridInfoRef.value[i].length)

    for(let j = 0; j < next; j++) {
      gridInfoRef.value[i].push('transparent')
    }
  }
})

const onDrop = (event, index) => {
  const newArr = []
  const color = event.dataTransfer.getData('color')
  const rows = gridInfoRef.value.length
  const columns = gridInfoRef.value[0].length
  const flatArr = gridInfoRef.value.flat()

  flatArr.splice(index, 1, color)

  for(let i = 0; i < rows; i++) {
    newArr.push(flatArr.slice(i * columns, columns * (i+1)))
  }

  // gridInfo = newArr
  gridInfoRef.value = newArr

  event.target.style.backgroundColor = color
}
</script>

<style scoped>
input {
  border: 1px solid #ddd;
  padding: var(--space-md);
  outline: none;
}
.grid {
  width: 900px;
  height: 900px;
  display: grid;
  gap: var(--space-sm);
}
.drop-box {
  aspect-ratio: 1 / 1;
  border: 1px solid #ddd;
}
</style>
