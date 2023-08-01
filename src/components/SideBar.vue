<template>
  <aside class="column gap">
    <div>import</div>
    <div class="color-box">
      <ColorChip v-for="(color, index) in colors" :key="index" :color="color" />
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import ColorChip from './ColorChip.vue'

const colors = ref(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'orchid'])
</script>

<style scoped>
aside {
  height: 100%;
  padding: var(--space-lg);
  border-right: 1px solid #eee;
  box-shadow: -5px 0 20px 0px rgba(0, 0, 0, .1);
}

.color-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}
</style>
