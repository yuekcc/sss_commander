<script setup>
import ShellConsole from './ShellConsole.vue'
</script>

<template>
  <header class="shadow p-4 mb-5 sticky top-0 bg-white">
    <div class="container flex mr-auto ml-auto ">
      <h1 class="text-xl">SSS 控制台</h1>
    </div>
  </header>
  <main class="container flex mr-auto ml-auto">
    <div class="flex-1">
      <ShellConsole></ShellConsole>
    </div>
  </main>
</template>
