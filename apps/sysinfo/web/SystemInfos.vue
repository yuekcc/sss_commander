<script setup>
import { onMounted, ref } from 'vue';
import ACard from './ACard.vue';

const infos = ref(null);

onMounted(async () => {
  infos.value = await fetch(`/apps/sysinfo/api/infos`).then(res => res.json());
  console.log(infos.value);
});
</script>

<template>
  <div class="flex gap-5">
    <template v-if="infos">
      <ACard label="引擎信息" class="flex-1">
        <div v-for="info in infos.engineInfos" :key="info.label" class="flex justify-between mb-3">
          <div class="flex-initial text-gray-500">{{ info.label }}</div>
          <div class="flex-initial break-all max-w-lg w-2/3">
            <template v-if="Array.isArray(info.content)">
              <div v-for="item in info.content" :key="item.label" class="flex justify-between">
                <div class="text-gray-500">{{ item.label }}</div>
                <div>{{ item.content }}</div>
              </div>
            </template>
            <template v-else>
              <span>{{ info.content }}</span>
            </template>
          </div>
        </div>
      </ACard>
      <ACard label="硬件信息" class="flex-1">
        <div v-for="info in infos.hwInfos" :key="info.label" class="flex justify-between mb-3">
          <div class="flex-initial text-gray-500">{{ info.label }}</div>
          <div class="flex-initial break-all max-w-lg w-2/3">{{ info.content }}</div>
        </div>
      </ACard>
    </template>
    <div v-else>
      <span>Loading ...</span>
    </div>
  </div>
</template>
