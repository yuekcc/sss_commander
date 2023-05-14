import mitt from 'mitt';
import { spawn } from 'node:child_process';

const emitter = mitt();

export function setConsoleListener(listener) {
  emitter.on('console-response', (...args) => {
    listener.apply(null, args);
  });
}

export function runScript(id, script) {
  const sh = spawn('sh', ['-c', script]);
  emitter.emit('console-response', {
    id,
    status: 'started',
    ping: script,
    time: `${Date.now()}`,
  });

  sh.stdout.on('data', data => {
    emitter.emit('console-response', {
      id,
      src: 'stdout',
      status: 'running',
      pong: data.toString(),
      time: `${Date.now()}`,
    });
  });

  sh.stderr.on('data', data => {
    emitter.emit('console-response', {
      id,
      src: 'stderr',
      status: 'running',
      pong: data.toString(),
      time: `${Date.now()}`,
    });
  });

  sh.on('close', code => {
    emitter.emit('console-response', {
      id,
      status: 'completed',
      code,
      time: `${Date.now()}`,
    });
  });
}
