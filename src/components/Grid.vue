<template>
  <div class="col column items-center">
    <div class="col column items-center pa-lg gap-xl">
      <div class="row justify-center items-center gap">
        <input v-model="rows" type="text" placeholder="rows">
        <font-awesome-icon icon="xmark" />
        <input v-model="columns" type="text" placeholder="columns">
      </div>
      <div class="grid" :class="{'grid-height': gridSize}" :style="{'grid-template-rows': `repeat(${rows}, 1fr)`, 'grid-template-columns': `repeat(${columns}, 1fr)`}">
        <template v-for="(item, index) in gridInfoRef.flat()" :key="index">
          <div class="drop-box" :style="{width: `${boxWidth}px`, background: item}" @drop.prevent="onDrop($event, index)" @dragenter.prevent @dragover.prevent></div>
        </template>
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
// row가 크면 height을 주고 col이 크면 width를 주고

const gridInfoRef = ref([['white']])
const rows = ref(1)
const columns = ref(1)
const boxWidth = computed(() => {
  return rows.value >= columns.value ? 900 / rows.value : 900 / columns.value
})
const gridSize = ref(rows.value <= columns.value)


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
      gridInfoRef.value[i].push('white')
    }
  }
})

watch(columns, (next, prev) => {
  for(let i = 0; i < gridInfoRef.value.length; i++) {
    gridInfoRef.value[i].splice(0, gridInfoRef.value[i].length)

    for(let j = 0; j < next; j++) {
      gridInfoRef.value[i].push('white')
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

  gridInfoRef.value = newArr

  event.target.style.backgroundColor = color
}
</script>

<style scoped>
input {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: var(--space-md);
  text-align: center;
  outline: none;
}
.grid {
  display: grid;
  justify-items: center;
  align-items: center;
  width: 900px;
  height: auto;
}
.grid-height {
  width: auto;
  height: 900px;
}
.drop-box {
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, .1);
  aspect-ratio: 1;
}
</style>
