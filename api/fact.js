// api/fact.js

// Important: Path is relative to the root project directory, not the api directory
const facts = require('../facts.json'); 

// Serverless function entry point for Vercel
module.exports = (req, res) => {
    // 1. Pick a random fact
    const randomIndex = Math.floor(Math.random() * facts.length);
    const fact = facts[randomIndex];
    const factText = fact.text;
    const factSource = fact.source; // Use the new source field

    // 2. Define the styling constants
    const width = 650;
    const height = 130;
    const bgColor = '#1E1E2E';      // Dark background (like VS Code/GitHub Dark)
    const quoteColor = '#89DDFF';   // Bright blue for accent/border
    const textColor = '#EEEEEE';    // Light text color
    const sourceColor = '#A9A9A9';  // Lighter gray for the source

    // 3. Construct the SVG content
    const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      
      <rect x="0" y="0" width="${width}" height="${height}" fill="${bgColor}" rx="8" />

      <rect x="0" y="0" width="8" height="${height}" fill="${quoteColor}" rx="0 0 0 0" />

      <foreignObject x="20" y="10" width="${width - 40}" height="${height - 20}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          box-sizing: border-box;
        ">
          <p style="
            color: ${textColor}; 
            font-size: 18px; 
            font-weight: 600; 
            line-height: 1.5; 
            margin: 0 0 8px 0;
            padding: 0;
            text-align: left;
          ">
            “${factText}”
          </p>

          <p style="
            color: ${sourceColor}; 
            font-size: 14px; 
            font-style: italic;
            margin: 0;
            padding: 0;
            text-align: left;
          ">
            — ${factSource}
          </p>
        </div>
      </foreignObject>
    </svg>
    `;

    // 4. Set HTTP Headers
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); 
    
    // 5. Send the SVG string
    res.send(svg);
};
