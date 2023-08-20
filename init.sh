#!/bin/bash

# Find or create .env file
ENV_FILE=".env"
if [ ! -f "$ENV_FILE" ]; then
  touch "$ENV_FILE"
fi

# Get current user's UID and GID
CURRENT_UID=$(id -u)
CURRENT_GID=$(id -g)

# Remove existing UID and GID lines if they exist
sed -i '/^UID=/d' "$ENV_FILE"
sed -i '/^GID=/d' "$ENV_FILE"

# Add new UID and GID lines at the end of the file
echo "UID=$CURRENT_UID" >> "$ENV_FILE"
echo "GID=$CURRENT_GID" >> "$ENV_FILE"

