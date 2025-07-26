<template>
  <n-el
    tag="ul"
    class="versions"
    style="background-color: var(--card-color); transition: 0.3s var(--cubic-bezier-ease-in-out)"
  >
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node v{{ versions.node }}</li>
  </n-el>
</template>

<script setup lang="ts">
const versions = reactive({ ...window.electron.process.versions })
</script>

<style lang="scss" scoped>
.versions {
  display: inline-flex;
  align-items: center;
  padding: 15px 0;
  margin: 0 auto;
  overflow: hidden;
  font-family: Menlo, 'Lucida Console', monospace;
  background-color: rgb(0 0 0 / 20%);
  border-radius: 22px;
  backdrop-filter: blur(2px);

  li {
    float: left;
    display: block;
    padding: 0 20px;
    font-size: 14px;
    line-height: 14px;
    text-shadow: 1px 1px 0 rgb(0 0 0 / 10%);
    border-right: 1px solid var(--ev-c-gray-1);
    opacity: 0.8;

    &:last-child {
      border: none;
    }
  }
}
</style>
