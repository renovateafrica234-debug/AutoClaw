const { execSync } = require('child_process');
const fs = require('fs');

// We generate the unified silhouette matching the uploaded autoclaw-logo.png
const drawContent = `
# Subtle shadow layer
push graphic-context
  affine 1 0 -0.32 1 123 23
  fill '#00000035'
  stroke '#00000025'
  stroke-width 8
  stroke-linejoin round
  path 'M 280,180 L 310,180 L 360,265 C 400,225 450,215 500,230 C 560,250 600,290 620,335 L 560,365 C 545,335 515,310 475,310 C 420,310 395,350 380,400 C 395,450 420,490 475,490 C 515,490 545,465 560,435 L 620,465 C 600,510 560,550 500,570 C 455,580 415,570 380,545 L 390,620 L 320,620 L 290,520 L 225,520 L 195,620 L 125,620 L 280,180 Z M 275,340 L 245,445 L 305,445 Z'
pop graphic-context

# Main AC Monogram in #E3FF00 with crisp 2.5px dark outline
push graphic-context
  affine 1 0 -0.32 1 120 20
  fill '#E3FF00'
  stroke '#141414'
  stroke-width 3
  stroke-linejoin round
  path 'M 280,180 L 310,180 L 360,265 C 400,225 450,215 500,230 C 560,250 600,290 620,335 L 560,365 C 545,335 515,310 475,310 C 420,310 395,350 380,400 C 395,450 420,490 475,490 C 515,490 545,465 560,435 L 620,465 C 600,510 560,550 500,570 C 455,580 415,570 380,545 L 390,620 L 320,620 L 290,520 L 225,520 L 195,620 L 125,620 L 280,180 Z M 275,340 L 245,445 L 305,445 Z'
pop graphic-context
`;

fs.writeFileSync('/tmp/autoclaw_logo_cmd.txt', drawContent);
execSync('convert -background none -size 800x800 xc:none -draw @/tmp/autoclaw_logo_cmd.txt public/autoclaw-logo.png');
// Also create a copy in dist/ and public/assets/
fs.copyFileSync('public/autoclaw-logo.png', 'dist/autoclaw-logo.png');
console.log('Logo generated and copied successfully');
