<template>
  <aside class="column gap-lg">
    <Import />
    <div class="color-box">
      <template v-for="(color, index) in colors" :key="index">
        <ColorChip :color="color" />
      </template>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import Import from './Import.vue'
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
