# Persiana Carpets Landing Page

## Server Details
- **Panel:** CloudPanel
- **IP:** 31.97.103.159
- **SSH user:** wgc-persiana
- **Deploy key:** ~/.ssh/persiana_deploy
- **WordPress root:** /home/writegoodpc/htdocs/persianacarpets.com/
- **Landing page path:** /home/writegoodpc/htdocs/persianacarpets.com/lp/persianV1/
- **Live URL:** https://persianacarpets.com/lp/persianV1/

## Deployment

**Auto-deploy:** Push to `main` triggers GitHub Actions → builds → rsync to server.

**Manual deploy:** `./scripts/deploy.sh`

**GitHub Secrets:** DEPLOY_SSH_KEY, DEPLOY_HOST, DEPLOY_USER, DEPLOY_PATH

## Deployment Checklist

**Setup (one-time)**
- [x] Get server IP, SSH username, WordPress path from client
- [x] Verify SSH access works (key-based auth)
- [x] Create `/lp/persianV1/` directory on server (770 permissions)
- [x] Nginx not needed — CloudPanel serves static files from htdocs automatically

**Deploy persianV1**
- [x] Update vite.config.js with `base: '/lp/persianV1/'`
- [x] Run `npm run build` and deploy via rsync
- [x] Test https://persianacarpets.com/lp/persianV1/
- [ ] Commit and push to GitHub

**Auto-deploy**
- [x] Generate SSH deploy key (~/.ssh/persiana_deploy)
- [x] Add public key to server
- [x] Add private key + config as GitHub secrets (4 secrets)
- [x] Create `.github/workflows/deploy.yml`
- [ ] Push and verify auto-deploy works

---

The rule: commit after any config change that works. If something breaks later, you can revert to a known good state.

## Future Landing Pages

To add a new landing page (e.g., persianV2):
1. New project with `base: '/lp/persianV2/'` in vite.config.js
2. `mkdir /home/writegoodpc/htdocs/persianacarpets.com/lp/persianV2` on server
3. Deploy dist to that directory
4. No Nginx changes needed
