<template>
  <div class="col column items-center pa-lg gap-xl">
    <div class="row justify-center items-center gap">
      <input v-model="rows" type="text" placeholder="rows">
      *
      <input v-model="columns" type="text" placeholder="columns">
    </div>
    <div class="grid" :style="{'grid-template-rows': `repeat(${rows}, 1fr)`, 'grid-template-columns': `repeat(${columns}, 1fr)`}">
      <!-- <div v-for="i in boxs" :key="i" class="drop-box" :style="{width: `${boxWidth}px`}" @drop.prevent="onDrop($event)" @dragenter.prevent @dragover.prevent></div> -->
      <div v-for="(item, index) in gridInfo.flat()" :key="index" class="drop-box" :style="{width: `${boxWidth}px`, background: item}" @drop.prevent="onDrop($event)" @dragenter.prevent @dragover.prevent></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

// gridInfo.length -> row개수
// gridInfo[0].length -> col개수

const gridInfo = [['transparent']]
const rows = ref(gridInfo?.length || 1)
const columns = ref(gridInfo[0]?.length || 1)
// const boxs = computed(() => columns.value * rows.value)
// const boxWidth = computed(() => 900 / rows.value)
const boxWidth = computed(() => 900 / rows)

watch(rows, (next, prev) => {
  gridInfo.splice(0, gridInfo.length)

  for(let i = 0; i < next; i++) {
    gridInfo.push([])
    
    for(let j = 0; j < columns.value; j++) {
      gridInfo[i].push('tranparent')
    }
  }
})

watch(columns, (next, prev) => {
  for(let i = 0; i < gridInfo.length; i++) {
    gridInfo[i].splice(0, gridInfo[i].length)

    for(let j = 0; j < next; j++) {
      gridInfo[i].push('transparent')
    }
  }
})

const onDrop = (event) => {
  const color = event.dataTransfer.getData('color')

  console.log(event.target)
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
