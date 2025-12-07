// api/fact.js

const facts = require('./facts.json'); 

// Serverless function entry point for Vercel
module.exports = (req, res) => {
    
    // =========================================================
    // 1. CRITICAL FIX: Check if the facts array is empty.
    // =========================================================
    if (!facts || facts.length === 0) {
        // Send a simple error message instead of crashing
        res.setHeader('Content-Type', 'image/svg+xml');
        return res.send('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="50"><text x="10" y="30" style="font-family: monospace; fill: red;">ERROR: Facts file is empty or missing!</text></svg>');
    }
    // =========================================================

    // 1. Pick a random fact
    const randomIndex = Math.floor(Math.random() * facts.length);
    const fact = facts[randomIndex];
    
    // 1b. Add a fail-safe check for the 'text' property
    const factText = fact && fact.text ? fact.text : "Error loading fact text.";
    
    // const factSource = fact.source; // REMOVED: No longer needed

    // 2. Define the styling constants
    const width = 650;
    const height = 180; // Increased height to accommodate the title and margin
    const bgColor = '#1E1E2E';       // Dark background (like VS Code/GitHub Dark)
    const titleColor = '#F2793C';    // Orange for the flame emoji/title (Approximation)
    const borderColor = '#343A40';  // Darker gray for the subtle border/separator
    const quoteColor = '#8BC34A';    // Green for the quote marks (Approximation)
    const textColor = '#EEEEEE';     // Light text color
    const titleText = 'Random IT Facts'; // CHANGED TITLE to match your header
    // ... rest of the code remains the same (SVG template)
    
    // 3. Construct the SVG content (This section is unchanged from yours)
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
