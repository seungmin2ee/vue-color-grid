<template>
  <div class="export-box">
    <button class="toggle-btn">Export</button>
    <div class="column gap">
      <div class="code-box">
        <pre>
          <code class="language-javascript">{{ grid }}</code>
        </pre>
      </div>
      <button class="export-btn" @click="handleExport(grid)">export</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, toRaw, watch } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

const props = defineProps({
  grid: Array,
})

onMounted(() => {
  hljs.highlightAll()
})

const handleExport = (code) => {
  let element = document.createElement('a')

  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(code)))
  element.setAttribute('download', '타일이다.js')

  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
</script>

<style scoped>
.export-box {
  position: absolute;
  top: 120px;
  right: 0;
}
.toggle-btn{
  width: 100px;
  padding: var(--space-md);
  position: absolute;
  left: -100px;
  background-color: #ddd;
  cursor: pointer;
}
.export-box > div {
  width: 600px;
  height: 400px;
  padding: var(--space-md);
  background-color: #ddd;
}

.code-box {
  flex: 1;
  display: flex;
}
.code-box pre {
  width: 100%;
  height: 100%;
  display: flex;
}
.code-box code {
  width: 100%;
  height: 100%;
}
.export-btn {
  width: 160px;
  padding: var(--space-md);
  border-radius: 4px;
  cursor: pointer;
}
</style>
