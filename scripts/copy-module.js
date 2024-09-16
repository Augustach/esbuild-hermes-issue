const fs = require('fs');
const path = require('path');


const count = 1000;
const folderName = 'Module';
const srcFolder = path.join(__dirname, '..', 'src');
const generatedFolder = path.join(srcFolder, 'generated');
const templateFile = path.join(srcFolder, 'template.tsx');
const template = fs.readFileSync(templateFile, 'utf8');

fs.rmSync(generatedFolder, { recursive: true, force: true });
fs.mkdirSync(generatedFolder, { recursive: true });

for (let i = 0; i < count; i++) {
    const dest = path.join(generatedFolder, `${folderName}${i}`);
    const indexFile = path.join(dest, 'index.tsx');
    fs.mkdirSync(dest, { recursive: true });
    let content = template;
    content = content.replace(`${folderName} =`, `${folderName}${i} =`);
    content = content.replaceAll("from './", "from '../../");
    fs.writeFileSync(indexFile, content);
}

const content = `
    import React from 'react';
    ${Array.from({ length: count }, (_, i) => `import { ${folderName}${i} } from './${folderName}${i}';`).join('\n')}

    
    export const Root = () => {
        return (
            <>
                ${Array.from({ length: count }, (_, i) => `<${folderName}${i} />`).join('\n')}
            </>
        );
    };

`;

fs.writeFileSync(path.join(generatedFolder, 'Root.tsx'), content);
