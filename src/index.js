import { App } from '@tinyhttp/app';
import sirv from 'sirv';

import { appList } from './app_list';

const app = new App();
app.use('/public', sirv('public', { dev: true })).get('/', (_, res) => {
  res.redirect('/public/index.html');
});

appList.forEach(config => {
  console.log('install app: %s', config.name);
  config.apiRoutes?.forEach(api => {
    console.log('add api: %s %s', api.method, api.path);
    app[api.method](api.path, api.handle);
  });
});

app.listen(3000, () => {
  console.log('listen on http://127.0.0.1:3000');
});
