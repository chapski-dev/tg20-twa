const fs = require('fs'); 


const createTsxFile = (folderName, name) => {
  const tsxFileName = `${folderName}/${name}.tsx`;
  const tsxContent = `import { FC } from 'react';
import * as S from './style';

type T${name}Props = {}

export const ${name}:FC<T${name}Props> = () => (
  <S.Wrapper>
    {/* Your component code here */}
  </S.Wrapper>
);
`;
  return fs.writeFile(tsxFileName, tsxContent, (err) => {
    if (err) {
      throw err;
    }
  });
};

const createIndexFile = (folderName, name) => {
  const indexFileName = `${folderName}/index.ts`;
  const indexContent = `export { ${name} } from './${name}';
`;

  return fs.writeFile(indexFileName, indexContent, (err) => {
    if (err) {
      throw err;
    }
  });
};

const createStyleFile = (folderName) => {
  const stylesFileName = `${folderName}/style.ts`;
  const stylesContent = `import styled from 'styled-components';

export const Wrapper = styled.div\`
  display: flex;
\`;
`;

  return fs.writeFile(stylesFileName, stylesContent, (err) => {
    if (err) {
      throw err;
    }
  });
};

const createComponent = (name, directory) => {
  const folderName = `${directory}/${name}`;

  if (fs.existsSync(folderName)) {
    throw new Error(`Folder '${folderName}' already exists`);
  }

  fs.mkdir(folderName, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });

  createTsxFile(folderName, name);
  createIndexFile(folderName, name);
  createStyleFile(folderName);
};

const directory = 'src';

if (process.argv.length > 2) {
  const componentName = process.argv[2];
  createComponent(componentName, directory);
} else {
  throw new Error('Please provide a component name');
}
