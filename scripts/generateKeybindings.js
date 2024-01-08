import fs from 'fs-extra';
import jsonfile from 'jsonfile';

// Create Markdown content
let markdownContent =
  '*this file is auto-generated. To update, edit `data/keybindings.json` and run `npm run generate`* \n# Keybindings \n\n<pre>\n';
jsonfile.readFileSync('./src/data/keybindings.json').forEach((shortcut) => {
  markdownContent += `<kbd>${shortcut.displayedShortcut}</kbd>: ${shortcut.description}\n`;
});
markdownContent += '</pre>';

// Write content to README.md file
fs.writeFile('docs/Keybindings.md', markdownContent, (err) => {
  if (err) throw err;
  console.log('docs/keybindings.md has been created successfully!');
});
