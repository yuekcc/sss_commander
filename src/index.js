import { App } from '@tinyhttp/app';
import formidable, { json, multipart, octetstream, querystring } from 'formidable';
import childProcess from 'node:child_process';
import sirv from 'sirv';

import { setConsoleListener, runScript } from './command_runner';

const app = new App();
app
  .use('/public', sirv('public', { dev: true }))
  .get('/', (_, res) => {
    res.redirect('/public/index.html');
  })
  .get('/api/console/pong', (req, res) => {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    setConsoleListener(data => {
      res.write(`data: ${JSON.stringify(data)}` + '\n\n');
    });
  })
  .post('/api/console', (req, res) => {
    const formParser = formidable({ enabledPlugins: [octetstream, querystring, multipart, json] });
    formParser.parse(req, (err, fields) => {
      if (err) {
        console.error('parser form error, %s', err.message);
        res.send(err.message).status(400);
        return;
      }

      const script = fields.script?.[0];
      const id = fields.id?.[0];
      runScript(id, script);
      res.send({ id, message: 'runner started' });
    });
  })
  .listen(3000, () => {
    console.log('listen on http://127.0.0.1:3000');
  });
