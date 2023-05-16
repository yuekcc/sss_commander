#!/bin/sh

set -ex

REPO_ROOT="$(pwd)"

pnpm run build:web
pnpm run build:server

cp ${REPO_ROOT}/node_modules/vue/dist/vue.esm-browser.prod.js public/

build_app() {
    node ${REPO_ROOT}/tools/build-app.mjs
}

cd apps/shell_console
build_app
