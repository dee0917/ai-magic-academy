const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// The regex will match: \${inputs.[propertyName] || 'fallback'}
// accounting for any spacing inside the ${}
code = code.replace(/\$\{\s*inputs\.[a-zA-Z0-9_]+\s*\|\|\s*'[^']+'\s*\}/g, '\x01$&\x02');
code = code.replace(/\$\{\s*inputs\.[a-zA-Z0-9_]+\s*\|\|\s*\"[^\"]+\"\s*\}/g, '\x01$&\x02');
code = code.replace(/\$\{\s*inputs\.[a-zA-Z0-9_]+\s*\}/g, '\x01$&\x02');

// Clean up double characters if any
code = code.replace(/\x01\x01/g, '\x01').replace(/\x02\x02/g, '\x02');

fs.writeFileSync('src/app/page.tsx', code);
console.log('Regex applied properly');
