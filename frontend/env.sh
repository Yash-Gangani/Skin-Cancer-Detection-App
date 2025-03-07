#!/bin/sh

# This script injects environment variables at container runtime
# It should be placed in the frontend directory and referenced in the Dockerfile

# The JS file containing the main application code (adjust the pattern if needed)
JS_FILES="/usr/share/nginx/html/assets/*.js"

# Replace environment variables in JS files
echo "Injecting environment variables..."

# Replace environment variable placeholders with actual values
for file in $JS_FILES; do
  # For each environment variable that needs to be replaced
  if [ ! -z "$VITE_BACK_END_URL" ]; then
    echo "Replacing VITE_BACK_END_URL with $VITE_BACK_END_URL"
    sed -i "s|__VITE_BACK_END_URL__|$VITE_BACK_END_URL|g" $file
  fi
  
  if [ ! -z "$VITE_ML_API_URL" ]; then
    echo "Replacing VITE_ML_API_URL with $VITE_ML_API_URL"
    sed -i "s|__VITE_ML_API_URL__|$VITE_ML_API_URL|g" $file
  fi
  
  # Add more environment variables as needed
done

echo "Environment variables injected successfully!"

# Execute the CMD from the Dockerfile
exec "$@"