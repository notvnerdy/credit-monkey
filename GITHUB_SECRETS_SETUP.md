# GitHub Secrets Setup Guide

This guide explains how to set up GitHub secrets for automated CI/CD deployments.

## Steps to Add GitHub Secrets

### 1. Go to Repository Settings
- Navigate to your repository: https://github.com/notvnerdy/credit-monkey
- Click **Settings** (top right)
- In the left sidebar, click **Secrets and variables** → **Actions**

### 2. Add the Following Secrets

Click **New repository secret** for each one:

#### Secret 1: STAGING_HOST
- **Name**: `STAGING_HOST`
- **Value**: `108.179.232.14`
- Click **Add secret**

#### Secret 2: STAGING_USER
- **Name**: `STAGING_USER`
- **Value**: `dionros`
- Click **Add secret**

#### Secret 3: STAGING_PATH
- **Name**: `STAGING_PATH`
- **Value**: `/home4/dionros/public_html`
- Click **Add secret**

#### Secret 4: SSH_PRIVATE_KEY
- **Name**: `SSH_PRIVATE_KEY`
- **Value**: Copy the contents of your `.ssh-key` file
  
  To get the key contents, run:
  ```bash
  cat ./.ssh-key
  ```
  
  Then copy the entire output and paste it as the secret value.

- Click **Add secret**

## Verification

After adding all secrets, you should see:
- ✅ STAGING_HOST
- ✅ STAGING_USER
- ✅ STAGING_PATH
- ✅ SSH_PRIVATE_KEY

## Testing the Deployment

Once secrets are configured:

1. Make a test commit to the `main` branch
2. Push it: `git push origin main`
3. Go to your repository's **Actions** tab
4. Watch the "Deploy to Staging" workflow run
5. Check that it completes successfully

## Workflow Details

The GitHub Actions workflow will:
- Trigger automatically on every push to `main` or `develop` branches
- Connect to the server via SSH
- Use rsync to deploy all files
- Exclude `.git`, `.github`, `.env`, `*.bak`, `*.py`, and `node_modules`
- Verify the deployment

## Troubleshooting

If the workflow fails:

1. **Check the workflow logs** in the Actions tab for error messages
2. **Verify SSH access** locally:
   ```bash
   bash deploy.sh
   ```
3. **Check SSH key passphrase** - if the key has a passphrase, it won't work in GitHub Actions
4. **Ensure paths are correct** in the secrets

## SSH Key Without Passphrase (Optional)

If your SSH key has a passphrase and you need a passphrase-less version:

```bash
ssh-keygen -p -f ./.ssh-key -N ""
```

(You'll be prompted for the current passphrase first)

**Warning**: This removes the passphrase protection. Only do this if you're comfortable with the security implications.

