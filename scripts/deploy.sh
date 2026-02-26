#!/usr/bin/env bash
set -euo pipefail

REMOTE_USER="wgc-persiana"
REMOTE_HOST="31.97.103.159"
SSH_KEY="$HOME/.ssh/persiana_deploy"
REMOTE_PATH="/home/writegoodpc/htdocs/persianacarpets.com/lp/persianV1/"

echo "==> Building..."
npm run build

echo "==> Deploying to ${REMOTE_HOST}..."
rsync -avz --delete \
  -e "ssh -i ${SSH_KEY}" \
  dist/ \
  "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"

echo "==> Done: https://persianacarpets.com/lp/persianV1/"
