import { setConsoleListener } from './command_runner';

export default {
  method: 'get',
  path: '/apps/shell_console/api/console/pong',
  handle(req, res) {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    setConsoleListener(data => {
      res.write(`data: ${JSON.stringify(data)}` + '\n\n');
    });
  },
};
