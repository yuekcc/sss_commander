import os from 'node:os';

function fetchEngineInfo() {
  const { versions, arch, platform, env } = process;

  const result = [
    {
      label: '操作系统',
      src: 'process.platform',
      content: platform,
    },
    {
      label: 'CPU 构架',
      src: 'process.arch',
      content: arch,
    },
    {
      label: '引擎版本',
      src: 'process.versions',
      content: Object.entries(versions).map(([label, content]) => {
        return { label, content };
      }),
    },
    // {
    //   label: '环境变量',
    //   src: 'process.env',
    //   content: Object.entries(env).map(([label, content]) => {
    //     return { label, content };
    //   }),
    // },
  ];

  return result;
}

function fetchHwInfo() {
  const cpus = os.cpus();
  const networkInterfaces = os.networkInterfaces();
  const totalmem = os.totalmem();

  const result = [
    {
      label: 'CPU',
      content: `${cpus?.[0].model || 'UNKNOWN CPU MODEL'} @ ${cpus?.[0].speed || '??'}MHz`,
    },
    {
      label: '内存',
      content: `${parseInt(totalmem / 1024 / 1024)}MB`,
    },
    ...Object.entries(networkInterfaces || {}).map(([name, ipAddrs], index) => {
      const ipv4 = ipAddrs.find(it => it.family === 'IPv4');
      return {
        label: `网卡 #${index + 1}`,
        content: `${name} @ ${ipv4?.address}`,
      };
    }),
  ];

  return result;
}

export function fetchSystemInfos() {
  const engineInfos = fetchEngineInfo();
  const hwInfos = fetchHwInfo();
  return {
    engineInfos,
    hwInfos,
  };
}
