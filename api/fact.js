// api/fact.js

// Important: Path is relative to the root project directory, not the api directory
const facts = require('./facts.json'); // This looks for it inside the same folder

// Serverless function entry point for Vercel
module.exports = (req, res) => {
    // 1. Pick a random fact
    const randomIndex = Math.floor(Math.random() * facts.length);
    const fact = facts[randomIndex];
    const factText = fact.text;
    // const factSource = fact.source; // REMOVED: No longer needed

    // 2. Define the styling constants
    const width = 650;
    const height = 180; // Increased height to accommodate the title and margin
    const bgColor = '#1E1E2E';      // Dark background (like VS Code/GitHub Dark)
    const titleColor = '#F2793C';   // Orange for the flame emoji/title (Approximation)
    const borderColor = '#343A40';  // Darker gray for the subtle border/separator
    const quoteColor = '#8BC34A';   // Green for the quote marks (Approximation)
    const textColor = '#EEEEEE';    // Light text color
    const titleText = 'Random Dev Quote';
    
    // 3. Construct the SVG content
    const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      
            <rect x="0" y="0" width="${width}" height="${height}" fill="${bgColor}" rx="8" />

            <rect x="0" y="0" width="8" height="${height}" fill="${quoteColor}" rx="8 0 0 8" />

            <foreignObject x="20" y="20" width="${width - 40}" height="24">
        <div xmlns="http://www.w3.org/1999/xhtml" style="
          display: flex;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        ">
          <span style="font-size: 20px; line-height: 1; margin-right: 8px;">🔥</span>
          <h2 style="
            color: ${textColor}; 
            font-size: 16px; 
            font-weight: 500; 
            margin: 0;
          ">
            ${titleText}
          </h2>
        </div>
      </foreignObject>

            <line x1="20" y1="55" x2="${width - 20}" y2="55" stroke="${borderColor}" stroke-width="1" />

            <foreignObject x="20" y="70" width="${width - 40}" height="${height - 90}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          box-sizing: border-box;
        ">
          <p style="
            color: ${textColor}; 
            font-size: 22px; 
            font-weight: 500; 
            line-height: 1.4; 
            margin: 0;
            padding: 0;
            text-align: left;
          ">
            <span style="color: ${quoteColor}; margin-right: 5px;">“</span>${factText}<span style="color: ${quoteColor}; margin-left: 5px;">”</span>
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
