#!/bin/bash

# Credit Monkey Deployment Script
# Deploys the website to the staging server

set -e

# Configuration
STAGING_HOST=${STAGING_HOST:-"108.179.232.14"}
STAGING_USER=${STAGING_USER:-"dionros"}
STAGING_PATH=${STAGING_PATH:-"/home4/dionros/stg.creditmonkey.com"}
SSH_KEY=${SSH_KEY:-"./.ssh-github"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Credit Monkey Deployment Script${NC}"
echo "================================"
echo "Host: $STAGING_HOST"
echo "User: $STAGING_USER"
echo "Path: $STAGING_PATH"
echo ""

# Check if SSH key exists
if [ ! -f "$SSH_KEY" ]; then
    echo -e "${RED}Error: SSH key not found at $SSH_KEY${NC}"
    exit 1
fi

# Test SSH connection
echo -e "${YELLOW}Testing SSH connection...${NC}"
if ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "$STAGING_USER@$STAGING_HOST" "echo 'SSH connection successful'" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ SSH connection successful${NC}"
else
    echo -e "${RED}✗ SSH connection failed${NC}"
    echo "Note: If the key is encrypted, you'll be prompted for the passphrase above."
    exit 1
fi

echo ""
echo -e "${YELLOW}Deploying files...${NC}"

# Deploy using rsync
rsync -avz --delete \
    --exclude='.git' \
    --exclude='.gitignore' \
    --exclude='.github' \
    --exclude='.env' \
    --exclude='.ssh-key' \
    --exclude='*.bak' \
    --exclude='node_modules' \
    --exclude='*.py' \
    -e "ssh -i $SSH_KEY" \
    ./ "$STAGING_USER@$STAGING_HOST:$STAGING_PATH/"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Files deployed successfully${NC}"
else
    echo -e "${RED}✗ Deployment failed${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Verifying deployment...${NC}"
ssh -i "$SSH_KEY" "$STAGING_USER@$STAGING_HOST" "ls -la '$STAGING_PATH' | head -20"

echo ""
echo -e "${GREEN}✓ Deployment complete!${NC}"
echo "Website available at: https://stg.creditmonkey.com"
echo ""
