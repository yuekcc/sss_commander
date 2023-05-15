#!/bin/sh

set -ex

pnpm run build:web
pnpm run build:server

REPO_ROOT="$(pwd)"

build_app() {
    node ${REPO_ROOT}/tools/build-app.mjs
}

cd apps/shell_console
build_app
