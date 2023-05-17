import { fetchSystemInfos } from './fetch_infos';

const fetchSystemInfosEndpoint = {
  method: 'get',
  path: '/apps/sysinfo/api/infos',
  handle(req, res) {
    const result = fetchSystemInfos();
    res.send(result);
  },
};

export default [fetchSystemInfosEndpoint];
