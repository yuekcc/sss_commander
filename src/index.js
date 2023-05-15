import { App } from '@tinyhttp/app';
import sirv from 'sirv';
import { resolve, join } from 'node:path';

import { appList } from './app_list';

const app = new App();
app.use('/public', sirv('public', { dev: true })).get('/', (_, res) => {
  res.redirect('/public/index.html');
});

app.use('/metadata', (_, res) => {
  res.send(
    appList.map(it => {
      return {
        name: it.name,
        web: it.web,
      };
    }),
  );
});

appList.forEach(config => {
  console.log('install app: %s', config.name);
  config.apis?.forEach(api => {
    console.log('add api: %s %s', api.method, api.path);
    app[api.method](api.path, api.handle);
  });

  const assetsDir = resolve(join(process.cwd(), config.web));
  console.log('add web: %s', assetsDir);
  app.use(config.web, sirv(assetsDir));
});

app.listen(3000, () => {
  console.log('listen on http://127.0.0.1:3000');
});
