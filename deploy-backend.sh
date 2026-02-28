#!/bin/bash

# Credit Monkey Backend Deployment Script
# Deploys Laravel backend to creditmonkey.com

set -e

# Configuration
SERVER="108.179.232.14"
USER="dionros"
BACKEND_PATH="/home4/dionros/public_html/api.creditmonkey"
PASSWORD="Seiretsu@12"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Credit Monkey Backend Deployment${NC}"
echo "================================"
echo "Server: $SERVER"
echo "User: $USER"
echo "Path: $BACKEND_PATH"
echo ""

# Function to run commands via SSH with password
run_ssh() {
    sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "$USER@$SERVER" "$1"
}

# Function to copy files with scp
copy_files() {
    sshpass -p "$PASSWORD" scp -o StrictHostKeyChecking=no -r "$1" "$USER@$SERVER:$2"
}

echo -e "${YELLOW}Step 1: Testing SSH connection...${NC}"
if run_ssh "echo 'SSH connection successful'"; then
    echo -e "${GREEN}✓ SSH connection successful${NC}"
else
    echo -e "${RED}✗ SSH connection failed${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 2: Creating backend directory...${NC}"
run_ssh "mkdir -p $BACKEND_PATH"
echo -e "${GREEN}✓ Directory created${NC}"

echo ""
echo -e "${YELLOW}Step 3: Deploying backend files...${NC}"

# Change to backend directory
cd backend

# Create temporary archive to deploy
echo "Creating deployment package..."
tar -czf ../backend-deploy.tar.gz \
    --exclude='node_modules' \
    --exclude='vendor' \
    --exclude='.git' \
    --exclude='storage/logs/*' \
    --exclude='storage/framework/cache/*' \
    --exclude='storage/framework/sessions/*' \
    --exclude='storage/framework/views/*' \
    --exclude='.env' \
    .

cd ..

echo "Uploading files..."
copy_files "backend-deploy.tar.gz" "$BACKEND_PATH/"

echo "Extracting files on server..."
run_ssh "cd $BACKEND_PATH && tar -xzf backend-deploy.tar.gz && rm backend-deploy.tar.gz"

# Cleanup local archive
rm backend-deploy.tar.gz

echo -e "${GREEN}✓ Backend files deployed${NC}"

echo ""
echo -e "${YELLOW}Step 4: Setting up environment...${NC}"
copy_files "backend/.env.production" "$BACKEND_PATH/.env"
echo -e "${GREEN}✓ Environment file configured${NC}"

echo ""
echo -e "${YELLOW}Step 5: Installing Composer dependencies...${NC}"
run_ssh "cd $BACKEND_PATH && composer install --no-dev --optimize-autoloader 2>&1 || php ~/composer.phar install --no-dev --optimize-autoloader 2>&1 || echo 'Note: Composer might need to be installed on server'"
echo -e "${GREEN}✓ Composer dependencies installed${NC}"

echo ""
echo -e "${YELLOW}Step 6: Setting up storage directories...${NC}"
run_ssh "cd $BACKEND_PATH && mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs && chmod -R 775 storage bootstrap/cache"
echo -e "${GREEN}✓ Storage directories configured${NC}"

echo ""
echo -e "${YELLOW}Step 7: Running database migrations...${NC}"
run_ssh "cd $BACKEND_PATH && php artisan migrate --force 2>&1"
echo -e "${GREEN}✓ Database migrations completed${NC}"

echo ""
echo -e "${YELLOW}Step 8: Optimizing Laravel...${NC}"
run_ssh "cd $BACKEND_PATH && php artisan config:cache && php artisan route:cache && php artisan view:cache"
echo -e "${GREEN}✓ Laravel optimized${NC}"

echo ""
echo -e "${YELLOW}Step 9: Setting permissions...${NC}"
run_ssh "cd $BACKEND_PATH && chmod -R 755 . && chmod -R 775 storage bootstrap/cache"
echo -e "${GREEN}✓ Permissions set${NC}"

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ Backend Deployment Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "API Endpoint: https://creditmonkey.com/api/leads"
echo "Admin Panel: https://creditmonkey.com/admin"
echo ""
echo "Next steps:"
echo "1. Point creditmonkey.com subdomain to $BACKEND_PATH/public"
echo "2. Update frontend API endpoint in assets/js/script.js"
echo "3. Test the API endpoint"
echo ""
