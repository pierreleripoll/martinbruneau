# S3 Commands for Image Upload and Metadata Update

This README provides the commands to upload images to an S3 bucket and update their metadata. These commands are tailored for use with the OVH Cloud S3-compatible storage service.

## Prerequisites

- Ensure you have the AWS CLI installed and configured with the appropriate credentials.
- Replace `s3://martinbruneau/` with your actual bucket name if it differs.
- Replace `https://s3.sbg.io.cloud.ovh.net` with the appropriate endpoint URL for your OVH Cloud region.

## Commands

### 1. Upload Images to S3 Bucket

This command uploads all files from the local `./photos/` directory to the specified S3 bucket. The `--recursive` flag ensures that all files in the directory are included. The `--acl public-read` flag makes the files publicly accessible.

```bash
aws s3 cp ./photos/ s3://martinbruneau/ --recursive --endpoint-url=https://s3.sbg.io.cloud.ovh.net --acl public-read
```

### 2. Update Metadata of Images in S3 Bucket

This command updates the metadata of all `.jpg` and `.webp` files in the specified S3 bucket. It sets the expiration date to January 1, 2034, makes the files publicly readable, and sets a cache control to maximize caching for 30 days.

```bash
aws s3 cp s3://martinbruneau/ s3://martinbruneau/ --exclude "*" --include "*.jpg" --include "*.webp" --recursive --metadata-directive REPLACE --expires 2034-01-01T00:00:00Z --acl public-read --cache-control max-age=2592000,public --endpoint-url=https://s3.sbg.io.cloud.ovh.net
```

## Explanation of Flags

- `--recursive`: Includes all files in the specified directory and its subdirectories.
- `--acl public-read`: Sets the Access Control List to make the files publicly readable.
- `--exclude "*"`: Excludes all files initially.
- `--include "*.jpg" --include "*.webp"`: Includes only `.jpg` and `.webp` files.
- `--metadata-directive REPLACE`: Replaces the existing metadata of the files.
- `--expires 2034-01-01T00:00:00Z`: Sets the expiration date for the files.
- `--cache-control max-age=2592000,public`: Sets cache control to 30 days (2592000 seconds).

## Additional Resources

- [AWS CLI Documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
- [OVH Cloud S3-Compatible Storage](https://docs.ovh.com/gb/en/storage/s3/)

By following these instructions, you can efficiently manage your image uploads and metadata updates on your OVH Cloud S3 bucket.

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
