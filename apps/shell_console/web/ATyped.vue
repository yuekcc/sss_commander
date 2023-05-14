<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Typed from 'typed.js';

const props = defineProps({
  content: { type: String, required: true },
  typeSpeed: { type: Number, default: 1 },
});

const panelRef = ref(null);
let typedInstance = null;

onMounted(() => {
  typedInstance = new Typed(panelRef.value, {
    strings: [props.content],
    contentType: null,
    typeSpeed: props.typeSpeed,
    showCursor: false,
  });
});

onUnmounted(() => {
  if (typedInstance) {
    typedInstance.destroy();
  }
});
</script>

<template>
  <pre ref="panelRef" class="whitespace-pre-wrap break-all"></pre>
</template>
