#!/bin/sh
# Push latest commits to GitHub
# Usage: ./push-to-github.sh

if [ -z "$GITHUB_PAT" ]; then
  echo "Error: GITHUB_PAT secret is not set."
  echo "Add it in the Secrets tab (key: GITHUB_PAT, value: your GitHub Personal Access Token)."
  exit 1
fi

REPO="https://github.com/mantukumar22/cafe_demo.git"
SAFE_URL=$(echo "$REPO" | sed 's|https://|https://***@|')

echo "Pushing to $SAFE_URL ..."
git push "https://$GITHUB_PAT@github.com/mantukumar22/cafe_demo.git" HEAD:main

if [ $? -eq 0 ]; then
  echo ""
  echo "Done! Latest commits are live on GitHub."
else
  echo ""
  echo "Push failed. Make sure your GITHUB_PAT has 'repo' scope."
fi
