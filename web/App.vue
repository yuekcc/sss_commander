<script setup>
import { loadingBar } from 'heyui';
import { reactive, ref, shallowRef } from 'vue';

import AppList from './components/AppList.vue';

function loadAppMainComponent(url) {
  return import(/* @vit-ignore */ url).then(m => m.default);
}

const app = reactive({
  name: '',
  webPath: '',
  loading: false,
  mainComponent: shallowRef(null),
});

async function startApp(appMetadata) {
  loadingBar.start();
  app.loading = true;
  try {
    Object.entries(appMetadata).forEach(([key, value]) => {
      app[key] = value;
    });

    console.log('#startApp', appMetadata);
    const url = `/${appMetadata.web}/index.js`.replace(/\/+/g, '/');
    app.mainComponent = await loadAppMainComponent(url);
  } finally {
    loadingBar.success();
    app.loading = false;
  }
}
</script>

<template>
  <header class="shadow p-3 mb-5 sticky top-0 bg-white">
    <div class="container flex mr-auto ml-auto items-center">
      <div class="mr-2">
        <AppList @select="startApp"></AppList>
      </div>
      <h1 class="text-xl">{{ app.displayName || app.name || 'SSS_Commander' }}</h1>
    </div>
  </header>
  <main class="container flex mr-auto ml-auto">
    <div class="flex-1">
      <template v-if="app.loading">
        <span>Loading ...</span>
      </template>
      <template v-else-if="!app.loading && app.mainComponent">
        <component :is="app.mainComponent"></component>
      </template>
      <template v-else>
        <span>请选择一个应用</span>
      </template>
    </div>
  </main>
</template>
