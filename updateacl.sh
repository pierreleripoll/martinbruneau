#!/bin/bash

# Update S3 metadata and ACL for optimized images
# Sets cache control, expiration, and public ACL

BUCKET="martinbruneau"
PREFIX="optimized/"
ENDPOINT="https://s3.sbg.io.cloud.ovh.net"

echo "Updating metadata and ACL for images in s3://${BUCKET}/${PREFIX}..."

aws s3 cp s3://${BUCKET}/${PREFIX} s3://${BUCKET}/${PREFIX} \
  --exclude "*" \
  --include "*.jpg" \
  --include "*.jpeg" \
  --include "*.webp" \
  --recursive \
  --metadata-directive REPLACE \
  --expires 2034-01-01T00:00:00Z \
  --acl public-read \
  --cache-control max-age=2592000,public \
  --endpoint-url=${ENDPOINT}

if [ $? -eq 0 ]; then
    echo "✓ Successfully updated metadata and ACL for all images in ${PREFIX}"
else
    echo "✗ Failed to update metadata/ACL"
    echo ""
    echo "This might be a permissions issue. Your S3 user needs:"
    echo "  - s3:PutObject"
    echo "  - s3:PutObjectAcl"
    echo "  - s3:GetObject"
    echo ""
    echo "Check your OVH S3 user permissions in the control panel."
    exit 1
fi
