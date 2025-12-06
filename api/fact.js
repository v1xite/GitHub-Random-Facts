// api/fact.js

// Important: Path is relative to the root project directory, not the api directory
const facts = require('../facts.json'); 

// Serverless function entry point for Vercel
module.exports = (req, res) => {
    // 1. Pick a random fact
    const randomIndex = Math.floor(Math.random() * facts.length);
    const fact = facts[randomIndex];
    const factText = fact.text;

    // 2. Define the SVG dimensions and styling
    const width = 600;
    const height = 100;
    const bgColor = '#1E293B'; // Dark blue-gray background
    const textColor = '#E2E8F0'; // Light text color

    // 3. Construct the SVG content using a <foreignObject> for easy HTML/CSS styling
    const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bgColor}" rx="10"/>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="
          color: ${textColor}; 
          padding: 20px; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 16px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          height: 100%; 
          text-align: center;
          line-height: 1.4;
        ">
          <p>💡 ${factText}</p>
        </div>
      </foreignObject>
    </svg>
    `;

    // 4. Set HTTP Headers
    // Content-Type tells the browser it's an SVG image
    res.setHeader('Content-Type', 'image/svg+xml');
    // Cache-Control prevents caching, ensuring a new fact loads every time
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); 

    // 5. Send the SVG string
    res.send(svg);
};