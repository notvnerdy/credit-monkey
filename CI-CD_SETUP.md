# CI/CD Pipeline Setup for Credit Monkey

## Overview
This document describes the CI/CD setup for the Credit Monkey website deployment to the staging environment.

## Configuration Files

### 1. `.env` (Environment Variables)
Located in the project root. Contains sensitive deployment information:
- Database credentials
- Server host and path
- SSH configuration

**Important**: Never commit `.env` to version control. This file is added to `.gitignore`.

### 2. `.ssh-github` (SSH Private Key)
The RSA private key for SSH authentication to the staging server (generated on server at `/home4/dionros/.ssh/github`).

**Location on server**: `/home4/dionros/.ssh/github`
**Local copy**: `.ssh-github` (for local deployments)

**Important**: Never commit this file to version control. Keep it secure.

### 3. `.ssh-github.pub` (SSH Public Key)
The public key corresponding to the private key. Used for reference and verification.

## Deployment Methods

### Method 1: GitHub Actions (Automated)
**File**: `.github/workflows/deploy-staging.yml`

Automatically deploys on:
- Push to `main` branch (production-ready)
- Push to `develop` branch (testing)
- Pull requests to `main` (validation)

#### Required GitHub Secrets
Configure these in your GitHub repository settings:

```
STAGING_HOST = 108.179.232.14
STAGING_USER = dionros
STAGING_PATH = /home4/dionros/credit-monkey
SSH_PRIVATE_KEY = [contents of local .ssh-github file]
```

**Note**: To get the private key contents:
1. On the server at `/home4/dionros/.ssh/github`, copy the entire file
2. Paste it into the GitHub Secret `SSH_PRIVATE_KEY`

#### Workflow Steps
1. Checkout code
2. Setup SSH (configure private key and known_hosts)
3. Validate HTML (checks for syntax errors)
4. Deploy using rsync (syncs files with staging server)
5. Verify deployment (confirms files on server)
6. Notify on success/failure

### Method 2: Manual Deployment Script
**File**: `deploy.sh`

For manual deployments when GitHub Actions is unavailable.

#### Usage
```bash
./deploy.sh
```

#### Requirements
- SSH key (``.ssh-key`) in project root
- SSH key must be decrypted or you need the passphrase
- rsync installed on your machine

#### What it does
1. Tests SSH connection to staging server
2. Validates SSH key existence
3. Syncs files using rsync (excludes .git, .env, .ssh-key, etc.)
4. Verifies files on remote server

## Deployment Exclusions

Both methods exclude these files/directories:
- `.git/github` - SSH private key (sensitive)
- `.ssh-github.pub` - SSH public key (for referenc
- `.gitignore` - Git config
- `.github/` - CI/CD config (except deploy script)
- `.env` - Environment variables (sensitive)
- `.ssh-key` - SSH private key (sensitive)
- `*.bak` - Backup files
- `node_modules/` - Dependencies
- `*.py` - Python scripts

## SSH Key Management

### Current Setup2048-bit
- **Server Location**: `/home4/dionros/.ssh/github` (private) and `/home4/dionros/.ssh/github.pub` (public)
- **Local Copy**: `.ssh-github` (for manual deployments)
- **Status**: Unencrypted (no passphrase required)
- **Fingerprint**: SHA256:qto8oMm5JPtEOXcZihnmLtP0OdHmmOA4CIj/I6bIrSw

### To Use with GitHub Actions
1. Get the private key from the server:
   ```bash
   cat /home4/dionros/.ssh/github
   ```
2. Go to GitHub repository → Settings → Secrets and variables → Actions
3. Add new secret: `SSH_PRIVATE_KEY`
4. Paste the entire private key contents

### To Use for Manual Deployments
Copy the private key from the server to your local machine:
```bash
scp dionros@108.179.232.14:/home4/dionros/.ssh/github ./.ssh-github
chmod 600 ./.ssh-github
```
3. Paste the full contents of `.ssh-key` file

## Connection Details

### Staging Server
- **Host**: 108.179.232.14
- **URL**: stg.creditvana.com
- **User**: dionros
# Option 1: Using local copy of key
ssh -i .ssh-github dionros@108.179.232.14

# Option 2: Using server's default key location (if properly configured)
sshme4/dionros/credit-monkey
- **Database**: dionros_credit-monkey

### Local Testing
Test SSH connection manually:

```bash
ssh -i .ssh-key dionros@108.179.232.14
```

## Monitoring Deployments

### GitHub Actions
View deployment logs:
1. Go to GitHub repository → Actions
2. Click on the workflow run
3. View the job logs for each step

### Manual Deployment
The deploy script provides real-time feedback:
- Green checkmarks (✓) = Success
- Red X marks (✗) = Failure
- Yellow text = Status updates

## Troubleshooting

### SSH Connection Fails
1. Verify SSH key is decrypted (if encrypted, you'll need passphrase)
2. Check host IP address (108.179.232.14)
3. Verify user permissions on server
4. Check `.ssh/known_hosts` for host key

### Deployment Fails
1. Check file permissions on server
2. Verify disk space on staging server
3. Check database connection in `.env`
4. Review rsync output for sync errors

### HTML Validation Errors
Validation is non-blocking (uses `continue-on-error: true`), so deployment continues even with HTML errors. To fail on validation errors, modify the workflow.

## Security Notes

⚠️ **Important**:
- Never commit `.env` or `.ssh-key` to version control
- Rotate credentials periodically
- Use strong passphrases for encrypted SSH keys
- Limit GitHub Actions secret access to necessary workflows
- Monitor deployment logs for unauthorized access attempts

## Future Improvements

- [ ] Add automated testing before deployment
- [ ] Implement rollback on deployment failure
- [ ] Add Slack/email notifications for deployments
- [ ] Create staging/production separation
- [ ] Add SSL certificate renewal automation
- [ ] Implement database backup before deployment
