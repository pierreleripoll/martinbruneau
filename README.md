# Martin Bruneau - Photography Portfolio

A Nuxt 3 photography portfolio website with optimized image delivery via S3 (OVH Cloud).

## Quick Start

### Setup

**First time?** See [SETUP.md](SETUP.md) for configuring AWS CLI and S3 credentials.

Install dependencies:

```bash
npm install
```

Verify your setup:

```bash
make setup-check
```

### Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
# or
make dev
```

---

## 📸 Updating Photos

### Complete Workflow

To update the website with new photos:

1. **Add original photos** to `public/photos/original/` directory (JPG format recommended)
2. **Process images** to generate optimized versions and metadata
3. **Upload** optimized images to S3
4. **Update** S3 metadata for caching

### Using Make Commands (Recommended)

```bash
# Complete workflow (all steps at once)
make all

# Or step by step:
make process        # Process images and generate metadata
make upload         # Upload to S3
make update-acl     # Update S3 cache settings
```

### Manual Steps

#### 1. Process Images

This generates multiple sizes (400px, 600px, 1080px, 1920px) in both WebP and JPEG formats, plus creates `assets/metadata-photos.json`:

```bash
node utils/processImages.js
```

Output:

- Optimized images → `public/photos/optimized/`
- Metadata → `assets/metadata-photos.json`

#### 2. Upload to S3

Upload optimized images to OVH Cloud S3:

```bash
node utils/uploadImages.js
```

#### 3. Update S3 Metadata

Set proper cache control and permissions:

```bash
bash updateacl.sh
```

Or manually with AWS CLI:

```bash
aws s3 cp s3://martinbruneau/optimized/ s3://martinbruneau/optimized/ \
  --exclude "*" --include "*.jpg" --include "*.webp" \
  --recursive --metadata-directive REPLACE \
  --expires 2034-01-01T00:00:00Z \
  --acl public-read \
  --cache-control max-age=2592000,public \
  --endpoint-url=https://s3.sbg.io.cloud.ovh.net
```

---

## 🛠 Available Make Commands

```bash
make help           # Show all available commands
make setup-check    # Verify AWS CLI and credentials are configured
make process        # Process images and generate metadata
make upload         # Upload optimized images to S3
make fetch          # Fetch original images from S3
make update-acl     # Update S3 cache/ACL settings
make all            # Complete workflow (process + upload + update-acl)
make clean          # Remove optimized images
make clean-original # Remove original images (careful!)
make dev            # Start dev server
make build          # Build for production
make preview        # Preview production build
```

---

## 📁 Project Structure

```
photos/
├── original/       # Place your original photos here
└── optimized/      # Generated optimized versions (auto-created)

assets/
└── metadata-photos.json  # Generated image metadata

utils/
├── fetchImages.js    # Fetch original images from S3
├── processImages.js  # Generate optimized images + metadata
└── uploadImages.js   # Upload optimized images to S3
```

---

## 🌐 S3 Configuration

**Bucket:** `martinbruneau`  
**Region:** `sbg` (OVH Cloud)  
**Endpoint:** `https://s3.sbg.io.cloud.ovh.net`  
**CDN URL:** `https://martinbruneau.s3.sbg.io.cloud.ovh.net`

### Prefixes

- Original photos: `lamelancolieduhangar/` (source)
- Optimized photos: `optimized/` (used by website)

### Prerequisites

- Node.js 18+
- AWS CLI (for manual S3 operations)
- AWS credentials configured (for OVH S3)

To configure AWS CLI for OVH:

```bash
aws configure --profile ovh
# AWS Access Key ID: [Your OVH S3 Access Key]
# AWS Secret Access Key: [Your OVH S3 Secret Key]
# Default region name: sbg
# Default output format: json
```

---

## 🖼 Image Processing Details

### Generated Sizes

For each original image, the following versions are created:

| Size     | Format     | Quality |
| -------- | ---------- | ------- |
| 400px    | WebP, JPEG | 85      |
| 600px    | WebP, JPEG | 85      |
| 1080px   | WebP, JPEG | 85      |
| 1920px   | WebP, JPEG | 85      |
| Original | WebP only  | 90      |

### Responsive Images

The website uses `<picture>` elements with srcset for optimal delivery:

- Mobile (<700px): 400px version
- Tablet (700-1200px): 600px version
- Desktop (1200-1920px): 1080px version
- Large screens (>1920px): 1920px version

WebP is prioritized with JPEG fallback for older browsers.

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
make build
```

### Generate Static Site

```bash
npm run generate
# or
make generate
```

### Preview Locally

```bash
npm run preview
# or
make preview
```

---

## 📚 Additional Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs/getting-started/introduction)
- [AWS CLI Documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
- [OVH Cloud S3 Storage](https://docs.ovh.com/gb/en/storage/s3/)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)
- [PhotoSwipe Gallery](https://photoswipe.com/)

---

## 📝 Tech Stack

- **Framework:** Nuxt 3
- **Image Processing:** Sharp
- **Gallery:** PhotoSwipe
- **Storage:** OVH Cloud S3
- **Formats:** WebP + JPEG

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
