<script setup>
import { onMounted, shallowRef } from 'vue';

function loadApp(url) {
  return import(/* @vit-ignore */ url).then(m => m.default);
}

const app = shallowRef(null);
onMounted(async () => {
  const url = `/apps/shell_console/dist/web/index.js`;
  app.value = await loadApp(url);
});
</script>

<template>
  <header class="shadow p-3 mb-5 sticky top-0 bg-white">
    <div class="container flex mr-auto ml-auto">
      <h1 class="text-xl">NAS 命令行</h1>
    </div>
  </header>
  <main class="container flex mr-auto ml-auto">
    <div class="flex-1">
      <template v-if="app">
        <component :is="app"></component>
      </template>
      <template v-else>
        <span>Loading ...</span>
      </template>
    </div>
  </main>
</template>
