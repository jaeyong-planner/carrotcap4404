const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const ASSETS_CONFIG = {
  hero: {
    'hero-image.png': {
      width: 1280,
      height: 720,
      background: { r: 245, g: 247, b: 250 },
      overlayText: 'AI Skin Analysis',
      outputPath: '../../public/assets/images/hero/'
    }
  },
  icons: {
    'scan.png': {
      width: 800,
      height: 800,
      background: { r: 33, g: 150, b: 243 },
      outputPath: '../../public/assets/images/icons/'
    },
    'recommendation.png': {
      width: 800,
      height: 800,
      background: { r: 156, g: 39, b: 176 },
      outputPath: '../../public/assets/images/icons/'
    },
    'tracking.png': {
      width: 800,
      height: 800,
      background: { r: 76, g: 175, b: 80 },
      outputPath: '../../public/assets/images/icons/'
    }
  },
  partners: {
    'glowpick.png': {
      width: 1024,
      height: 768,
      background: { r: 255, g: 255, b: 255 },
      outputPath: '../../public/assets/images/partners/'
    },
    'hwahae.png': {
      width: 1024,
      height: 768,
      background: { r: 255, g: 255, b: 255 },
      outputPath: '../../public/assets/images/partners/'
    },
    'lovicare.png': {
      width: 1024,
      height: 768,
      background: { r: 255, g: 255, b: 255 },
      outputPath: '../../public/assets/images/partners/'
    }
  }
};

async function generateAssets() {
  for (const [category, assets] of Object.entries(ASSETS_CONFIG)) {
    for (const [filename, config] of Object.entries(assets)) {
      const { width, height, background, outputPath } = config;
      
      await sharp({
        create: {
          width,
          height,
          channels: 4,
          background
        }
      })
      .png()
      .toFile(path.join(__dirname, outputPath, filename));
      
      console.log(`Generated ${filename}`);
    }
  }
}

generateAssets().catch(console.error);