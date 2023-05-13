#!/bin/sh

set -ex

pnpm run build:web
pnpm run build:server
