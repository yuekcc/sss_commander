<script setup>
import ShellConsole from '../apps/shell_console/web';
</script>

<template>
  <header class="shadow p-3 mb-5 sticky top-0 bg-white">
    <div class="container flex mr-auto ml-auto">
      <h1 class="text-xl">NAS 命令行</h1>
    </div>
  </header>
  <main class="container flex mr-auto ml-auto">
    <div class="flex-1">
      <ShellConsole></ShellConsole>
    </div>
  </main>
</template>
