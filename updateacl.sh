#!/bin/bash

# List all object keys in the bucket 'martinbruneau' and make them public
objects=$(aws s3api list-objects-v2 --bucket martinbruneau --endpoint-url=https://s3.sbg.io.cloud.ovh.net --query 'Contents[].Key' --output text)
if [ -z "$objects" ]; then
    echo "No objects found or error listing objects."
    exit 1
fi

for key in ${objects}
do
    echo "Setting ACL for $key"
    if ! aws s3api put-object-acl --bucket martinbruneau --endpoint-url=https://s3.sbg.io.cloud.ovh.net --key "$key" --acl public-read
    then
        echo "Failed to set ACL for $key"
    fi
done
