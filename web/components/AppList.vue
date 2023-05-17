<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { fetchAppList } from '../service';
import AppHubIcon from './AppHubIcon.vue';

const appList = ref([]);
const searchKeyword = ref('');
const tooltipRef = ref(null);

const emits = defineEmits(['select']);

function selectApp(appMetadata) {
  emits('select', appMetadata);
  nextTick(() => {
    tooltipRef.value.hide();
  });
}

onMounted(async () => {
  appList.value = await fetchAppList();
});
</script>

<template>
  <Tooltip ref="tooltipRef" theme="white" trigger="click">
    <AppHubIcon class="hover:bg-sky-100 hover:rounded hover:cursor-pointer"></AppHubIcon>
    <template #content>
      <div class="app-list">
        <div class="mb-2">
          <Search v-model="searchKeyword"></Search>
        </div>
        <div class="max-h-96 overflow-y-auto flex flex-col gap-2">
          <div
            v-for="app in appList"
            :key="app.name"
            class="flex justify-start items-center hover:bg-sky-100 hover:rounded hover:cursor-pointer"
            @click="() => selectApp(app)"
          >
            <div class="flex-initial mr-2"><img :src="app.icon" width="32" height="32" /></div>
            <div class="flex-initial">{{ app.displayName }}</div>
          </div>
        </div>
      </div>
    </template>
  </Tooltip>
</template>
