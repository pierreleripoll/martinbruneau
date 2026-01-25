#!/bin/bash

# Helper script to check font setup

FONT_DIR="public/fonts"

echo "════════════════════════════════════════════"
echo "  Font Setup Checker"
echo "════════════════════════════════════════════"
echo ""

if [ ! -d "$FONT_DIR" ]; then
    echo "❌ Font directory not found: $FONT_DIR"
    echo ""
    echo "Creating directory..."
    mkdir -p "$FONT_DIR"
    echo "✓ Created $FONT_DIR"
    echo ""
fi

echo "Checking for font files in $FONT_DIR:"
echo "────────────────────────────────────────────"
echo ""

FOUND_ANY=false

# Check for Glacial Indifference
echo "Glacial Indifference:"
for ext in woff2 woff ttf otf; do
    if ls $FONT_DIR/GlacialIndifference*.$ext 2>/dev/null | grep -q .; then
        ls $FONT_DIR/GlacialIndifference*.$ext | while read file; do
            echo "  ✓ $(basename $file)"
            FOUND_ANY=true
        done
    fi
done

# Check for HK Grotesk
echo ""
echo "HK Grotesk:"
for ext in woff2 woff ttf otf; do
    if ls $FONT_DIR/HKGrotesk*.$ext 2>/dev/null | grep -q .; then
        ls $FONT_DIR/HKGrotesk*.$ext | while read file; do
            echo "  ✓ $(basename $file)"
            FOUND_ANY=true
        done
    fi
done

echo ""
echo "────────────────────────────────────────────"

# Count total files
TOTAL=$(ls -1 $FONT_DIR 2>/dev/null | wc -l)

if [ "$TOTAL" -eq 0 ]; then
    echo ""
    echo "❌ No font files found!"
    echo ""
    echo "📖 Please read FONTS.md for setup instructions"
    echo ""
    echo "Required fonts:"
    echo "  1. Glacial Indifference: https://www.1001fonts.com/glacial-indifference-font.html"
    echo "  2. HK Grotesk: https://www.1001fonts.com/hk-grotesk-font.html"
    echo ""
    echo "Place the downloaded fonts in: $FONT_DIR/"
    echo ""
else
    echo ""
    echo "✓ Found $TOTAL file(s) in $FONT_DIR"
    echo ""
    echo "Recommended file structure:"
    echo "  • GlacialIndifference-Regular.woff2"
    echo "  • GlacialIndifference-Bold.woff2"
    echo "  • HKGrotesk-Regular.woff2"
    echo "  • HKGrotesk-Bold.woff2"
    echo ""
    echo "💡 Tip: WOFF2 format is preferred for best compression"
    echo ""
fi

echo "════════════════════════════════════════════"
