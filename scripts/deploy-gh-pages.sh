#!/usr/bin/env bash
set -euo pipefail

# Build static export with GitHub Pages basePath (/MNG2011)
echo "Building static site for GitHub Pages..."
GITHUB_PAGES=true npm run build

# Ensure GitHub Pages serves _next/ directory
touch out/.nojekyll

REMOTE_URL=$(git config --get remote.origin.url)
if [ -z "$REMOTE_URL" ]; then
  echo "Error: No git remote 'origin' found."
  exit 1
fi

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

echo "Deploying out/ to gh-pages branch..."
cp -r out/. "$TMP_DIR/"

cd "$TMP_DIR"
git init -b gh-pages
git add -A
git commit -m "Deploy to GitHub Pages"
git push --force "$REMOTE_URL" gh-pages

echo "Done! Deployed to gh-pages branch."

