<script setup>
import { nextTick, reactive, ref, onMounted, computed } from 'vue';
import { runScript } from './service';

const commandLine = ref('')
const messageId = ref(`${Date.now()}`);

const messages = reactive({
  [messageId.value]: {
    id: messageId.value,
    ping: '',
    pong: '欢迎回来',
    time: messageId.value,
  }
})

const messagesDisplay = computed(() => {
  const list = Object.values(messages)
  list.sort((a, b) => {
    return parseInt(a.id) - parseInt(b.id)
  })

  return list;
})


onMounted(() => {
  const sse = new EventSource('/api/console/pong')
  sse.addEventListener('message', ({ data }) => {
    console.log(data);
    const { id, status, ping, pong, src, code, time } = JSON.parse(data);

    if (!messages[id]) {
      messages[id] = {
        id,
      }
    }

    if (status === 'started') {
      messages[id].ping = ping
    }

    if (status === 'running') {
      messages[id].pong = `${messages[id].pong || ''}` + `${pong || ''}`
    }

    if (status === 'completed') {
      messages[id].code = code
      messages[id].time = time
    }

    nextTick(() => {
      const el = document.querySelector('.is-last-message')
      if (el) {
        el.scrollIntoView(false)
      }
    })
  })
})

function isLastMessage(idx) {
  return idx === (messages.length - 1)
}

function doRunCommand() {
  const shellScript = `${commandLine.value || ''}`.trim();
  if (!shellScript) {
    return;
  }

  commandLine.value = '';
  messageId.value = `${Date.now()}`
  runScript(messageId.value, shellScript);
}

function runCommand(event) {
  if (event.ctrlKey && event.keyCode === 13) {
    doRunCommand()
  }
}
</script>

<template>
  <div class="shell-console h-full">
    <div v-for="(message, index) in messagesDisplay" :key="message.id">
      <div class="query flex justify-end mb-2" v-if="message.ping">
        <div>
          <div class="text-right mb-2">
            <span class="text-xl p-1 border rounded-md">😀</span>
          </div>
          <div class="flex-initial min-w-[500px] max-w-[800px] border p-2 bg-blue-100 rounded-md">
            <pre class="word-break">{{ message.ping }}</pre>
          </div>
        </div>
      </div>
      <div class="query flex justify-start mb-2" :class="{ 'is-last-message': isLastMessage(index) }">
        <div>
          <div class="text-left mb-2">
            <span class="text-xl p-1 border rounded-md">🛸</span>
          </div>
          <div class="message flex-initial min-w-[500px] max-w-full border p-2 bg-gray-100 rounded-md">
            <pre>{{ message.pong || '<EMPTY>' }}</pre>
          </div>
          <div class="h-[30px]" v-if="isLastMessage(index)"></div>
        </div>
      </div>
    </div>
    <div class="sticky bottom-0 pt-2 pb-2">
      <textarea type="text" placeholder="Ctrl+Enter 发送命令。仅支持非交互式命令" v-model="commandLine" @keyup="runCommand($event)"
        class="w-full rounded-md"></textarea>
    </div>
  </div>
</template>
