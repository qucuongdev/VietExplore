import fs from 'fs';

let content = fs.readFileSync('src/data/provinces.ts', 'utf8');

// Notice each duplicate chunk has:
//     },
//       sourceUrl: 'https://unsplash.com/photos/...',
//       photographer: '...',
//       licenseName: '...',
//       licenseUrl: '...',
//       verifiedLocation: true,
//     },
//   },

content = content.replace(/\s*sourceUrl:\s*'https:\/\/unsplash\.com\/photos\/[^']+',\s*photographer:\s*'[^']+',\s*licenseName:\s*'[^']+',\s*licenseUrl:\s*'[^']+',\s*verifiedLocation:\s*true,\s*\},(\s*\},)/g, '$1');

fs.writeFileSync('src/data/provinces.ts', content, 'utf8');
console.log('Fixed provinces.ts duplicates');
