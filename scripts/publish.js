const fs = require('fs');
const path = require('path');

const token = process.env.NPM_TOKEN;

const npmrcPath = path.join(__dirname, '.npmrc');

fs.writeFileSync(npmrcPath, `//registry.npmjs.org/:_authToken=${token}`);
