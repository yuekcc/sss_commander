import { build } from 'esbuild';
import { resolve } from 'node:path';
import { copyFile } from 'node:fs/promises';
import Vue from 'unplugin-vue/esbuild';

function buildApis() {
  return build({
    entryPoints: [resolve(process.cwd(), 'apis/index.js')],
    platform: 'node',
    target: 'node16',
    bundle: true,
    outdir: 'dist/apis',
    format: 'esm',
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    sourcemap: true,
    minify: true,
  });
}

function buildWeb() {
  return build({
    entryPoints: [resolve(process.cwd(), 'web/index.js')],
    bundle: true,
    platform: 'browser',
    target: 'chrome84',
    outdir: 'dist/web',
    format: 'esm',
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    sourcemap: true,
    minify: true,
    external: ['vue'],
    plugins: [Vue({})],
  });
}

!(async () => {
  console.log('build web ...');
  await buildWeb();

  console.log('build apis ...');
  await buildApis();

  console.log('install metadata.js ...');
  await copyFile(resolve(process.cwd(), 'index.js'), resolve(process.cwd(), 'dist/index.js'));
})().finally(() => {
  console.log('DONE');
});
