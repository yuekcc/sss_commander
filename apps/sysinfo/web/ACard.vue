<script setup>
defineProps({
  label: { type: String, required: true },
});
</script>

<template>
  <div class="a-card flex flex-col p-3 border rounded shadow bg-white">
    <div class="header mb-5">
      <h3 class="text-lg font-semibold">{{ label }}</h3>
    </div>
    <div class="body flex flex-col">
      <slot></slot>
    </div>
  </div>
</template>
