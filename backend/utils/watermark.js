// File: utils/watermark.js
const sharp = require("sharp");

async function addWatermark(inputPath, outputPath, text) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    const watermarkText = text;
    // Bigger size (e.g., ~1/6th of image width)
    const fontSize = Math.floor(metadata.width / 6);

    // SVG overlay
    const svgText = `
    <svg width="${metadata.width}" height="${metadata.height}">
      <style>
        .title { 
          fill: rgba(0, 0, 0, 0.2); /* light black */
          font-size: ${fontSize}px; 
          font-family: Arial, sans-serif; 
          font-weight: bold;
        }
      </style>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="title">
        ${watermarkText}
      </text>
    </svg>
    `;

    const svgBuffer = Buffer.from(svgText);

    await image
      .composite([{ input: svgBuffer, top: 0, left: 0 }])
      .toFile(outputPath);

    console.log(`✅ Watermark added successfully to ${outputPath}`);
  } catch (error) {
    console.error("❌ Error adding watermark:", error);
    throw error;
  }
}

module.exports = { addWatermark };
