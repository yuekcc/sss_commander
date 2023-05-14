<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import ATyped from './components/ATyped.vue';
import { runScript } from './service';
import throttle from 'lodash/throttle';

const commandLine = ref('');
const messageId = ref(`${Date.now()}`);

const messages = reactive({
  [messageId.value]: {
    id: messageId.value,
    ping: '',
    pong: '欢迎回来。请输入命令',
    time: messageId.value,
  },
});

const messagesCache = {};

const messagesDisplay = computed(() => {
  const list = Object.values(messages);
  list.sort((a, b) => {
    return parseInt(a.id) - parseInt(b.id);
  });

  return list;
});

let observer = null;

onMounted(() => {
  const sse = new EventSource('/api/console/pong');
  sse.addEventListener('message', ({ data }) => {
    console.log(data);
    const { id, status, ping, pong, src, code, time } = JSON.parse(data);

    if (!messages[id]) {
      messages[id] = {
        id,
      };

      messagesCache[id] = '';
    }

    if (status === 'started') {
      messages[id].ping = ping;
    }

    if (status === 'running') {
      messagesCache[id] = `${messagesCache[id] || ''}` + `${pong || ''}`;
    }

    if (status === 'completed') {
      messages[id].code = code;
      messages[id].time = time;
      messages[id].pong = messagesCache[id]?.trimEnd() || '<NOTHING>  ';
    }
  });

  observer = new MutationObserver(
    throttle(() => {
      console.log('tree updated');
      const el = document.querySelector('#view-control');
      if (el) {
        el.scrollIntoView(false);
      }
    }, 100),
  );

  observer.observe(document.querySelector('.shell-console'), { attributes: true, childList: true, subtree: true });
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});

function isLastMessage(idx) {
  return idx === messagesDisplay.value.length - 1;
}

function doRunCommand() {
  const shellScript = `${commandLine.value || ''}`.trim();
  if (!shellScript) {
    return;
  }

  commandLine.value = '';
  messageId.value = `${Date.now()}`;
  runScript(messageId.value, shellScript);
}

function runCommand(event) {
  if (event.ctrlKey && event.keyCode === 13) {
    doRunCommand();
  }
}
</script>

<template>
  <div class="shell-console p-5 bg-white relative overflow-hidden" style="height: calc(100vh - 100px);">
    <div class="h-[90%] p-5 overflow-y-auto">
      <div v-for="(message, index) in messagesDisplay" :key="message.id">
        <div v-if="message.ping" class="query flex justify-end mb-2">
          <div>
            <div class="text-right mb-2">
              <span class="text-xl p-1 border rounded-md">😀</span>
            </div>
            <div class="flex-initial min-w-[500px] max-w-[800px] border p-2 bg-blue-100 rounded-md">
              <pre class="word-break">{{ message.ping }}</pre>
            </div>
          </div>
        </div>
        <div class="query flex justify-start mb-2">
          <div>
            <div class="text-left mb-2">
              <span class="text-xl p-1 border rounded-md">🛸</span>
            </div>
            <div class="message flex-initial min-w-[500px] max-w-full border p-2 bg-gray-100 rounded-md">
              <ATyped v-if="message.pong" :content="message.pong"></ATyped>
              <pre v-else>正在执行 ...</pre>
            </div>
          </div>
        </div>
        <div v-if="isLastMessage(index)" id="view-control" class="h-[100px]"></div>
      </div>
    </div>
    <div class="absolute left-0 right-0 bottom-0 p-5">
      <textarea
        v-model="commandLine"
        type="text"
        placeholder="Ctrl+Enter 发送命令。仅支持非交互式命令"
        class="w-full rounded-md"
        @keyup="runCommand($event)"
      ></textarea>
    </div>
  </div>
</template>
