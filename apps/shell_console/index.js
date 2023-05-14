import pongApi from './api/pong';
import consoleApi from './api/console';

export default {
  name: 'shell_console',
  apiRoutes: [pongApi, consoleApi],
};
