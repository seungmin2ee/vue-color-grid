<template>
  <div :class="`color-chip color-${color}`" draggable="true" @dragstart="startDrag($event, color)"></div>
</template>

<script setup>
const props = defineProps({
  color: String
})

const startDrag = (event, color) => {
  event.dataTransfer.setData('color', color)
}
</script>

<style scoped>
.color-chip {
  width: 160px;
  height: 160px;
  border-radius: 16px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, .3);
  cursor: pointer;
}
.color-red {
  background-color: red;
}
.color-orange {
  background-color: orange;
}
.color-blue {
  background-color: blue;
}
.color-green {
  background-color: green;
}
.color-yellow {
  background-color: gold;
}
.color-orchid {
  background-color: orchid;
}
.color-purple {
  background-color: purple;
}
</style>
