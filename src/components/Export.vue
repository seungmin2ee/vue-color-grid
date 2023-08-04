<template>
  <div class="export-box" :class="{active: toggleState}">
    <button class="toggle-btn" @click="handleClickToggle">
      <font-awesome-icon icon="chevron-left" />
      Export
    </button>
    <div class="column gap">
      <div class="code-box">
        <pre>
          <code class="language-javascript">{{ grid }}</code>
        </pre>
      </div>
      <button class="export-btn" @click="handleExport(grid)">
        <font-awesome-icon icon="file-export" />
        Export
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

const props = defineProps({
  grid: Array,
})

const toggleState = ref(false)

onMounted(() => {
  hljs.highlightAll()
})

const handleExport = (code) => {
  let element = document.createElement('a')

  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(code)))
  element.setAttribute('download', '타일이다.json')

  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

const handleClickToggle = () => {
  toggleState.value = !toggleState.value
}
</script>

<style scoped>
.export-box {
  position: absolute;
  top: 120px;
  right: -600px;
  transition: .5s ease-in-out;
}
.export-box.active {
  right: 0;
}
.toggle-btn {
  width: 120px;
  padding: var(--space-md);
  position: absolute;
  left: -120px;
  background-color: #393E46;
  color: #eee;
  font-size: 18px;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  cursor: pointer;
}
.export-box > div {
  width: 600px;
  height: 400px;
  padding: var(--space-md);
  background-color: #393E46;
  visibility: hidden;
  transition: .5s ease-in-out;
}
.export-box.active > div {
  visibility: visible;
  border-bottom-left-radius: 10px;
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
  width: 100%;
  padding: var(--space-md);
  border-radius: 4px;
  background-color: #00ADB5;
  color: #eee;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: .2s ease-in-out;
}
.export-btn:hover {
  color: #eee;
  background-color: #3FC1C9;
}
</style>
