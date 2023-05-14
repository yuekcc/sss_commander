import formidable, { json, multipart, octetstream, querystring } from 'formidable';
import { runScript } from './command_runner';

export default {
  method: 'post',
  path: '/apps/shell_console/api/console',
  handle(req, res) {
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
  },
};
