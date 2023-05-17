#!/bin/sh

set -ex

REPO_ROOT="$(pwd)"

cp ${REPO_ROOT}/node_modules/vue/dist/vue.esm-browser.prod.js public/

build_app() {
    node ${REPO_ROOT}/tools/build-app.mjs
}

cd apps/shell_console
build_app
cd $REPO_ROOT

cd apps/sysinfo
build_app
cd $REPO_ROOT
