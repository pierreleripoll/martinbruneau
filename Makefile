.PHONY: help process upload update-metadata clean dev build preview check-aws check-credentials check-fonts

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

check-fonts: ## Check if custom fonts are installed
	@bash check-fonts.sh

check-aws: ## Check if AWS CLI is installed
	@command -v aws >/dev/null 2>&1 || { echo "❌ AWS CLI is not installed. See SETUP.md for instructions."; exit 1; }
	@echo "✓ AWS CLI is installed"

check-credentials: check-aws ## Check if AWS credentials are configured
	@aws configure list >/dev/null 2>&1 || { echo "❌ AWS credentials not configured. Run: aws configure"; echo "See SETUP.md for details."; exit 1; }
	@echo "✓ AWS credentials are configured"

setup-check: check-aws check-credentials ## Verify complete setup (AWS CLI + credentials)
	@echo "✓ All setup requirements met!"

process: ## Process images from photos/original/ to photos/optimized/ and generate metadata
	@echo "Processing images and generating metadata..."
	@node utils/processImages.js && echo "✓ Images processed successfully!" || { echo "❌ Image processing failed"; exit 1; }

upload: check-credentials ## Upload optimized images to S3 (requires AWS credentials)
	@echo "Uploading images to S3..."
	@node utils/uploadImages.js && echo "✓ Images uploaded successfully!" || { echo "❌ Upload failed - check your AWS credentials"; exit 1; }

fetch: check-credentials ## Fetch original images from S3 (from lamelancolieduhangar/ prefix)
	@echo "Fetching images from S3..."
	@node utils/fetchImages.js && echo "✓ Images fetched successfully!" || { echo "❌ Fetch failed"; exit 1; }

update-acl: check-aws ## Update S3 metadata (cache control, ACL, expires)
	@echo "Updating S3 metadata..."
	@bash updateacl.sh

all: process upload update-acl ## Process images, upload to S3, and update metadata (complete workflow)
	@echo ""
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "✓ Complete workflow finished!"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

clean: ## Remove all optimized images
	@echo "Cleaning optimized images..."
	rm -rf public/photos/optimized/*
	@echo "✓ Cleaned!"

clean-original: ## Remove all original images (use with caution!)
	@echo "Cleaning original images..."
	rm -rf public/photos/original/*
	@echo "✓ Cleaned!"

dev: ## Start Nuxt development server
	npm run dev

build: ## Build Nuxt application for production
	npm run build

generate: ## Generate static site
	npm run generate

preview: ## Preview production build locally
	npm run preview

install: ## Install dependencies
	npm install
