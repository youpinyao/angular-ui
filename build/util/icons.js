const fs = require('fs');
const path = require('path');
const css = require('css');

const options = {
  encoding: 'utf-8',
};

const iconsStr = fs.readFileSync(path.resolve(__dirname, '../../src/scss/_icons.scss'), options);

const cssObj = css.parse(iconsStr);
let icons = [];

cssObj.stylesheet.rules.forEach(rule => {
  if (rule.type === 'rule') {
    selector = rule.selectors[0];
    if (selector.indexOf('.icon-') !== -1) {
      selector = selector.split('.icon-')[1];
      selector = selector.split(':before')[0];

      icons.push(selector);
    }
  }
});

icons = JSON.stringify(icons);

icons = icons.replace(/"/g, '\'');
icons = icons.replace(/,/g, ', ');

fs.writeFileSync(path.resolve(__dirname, '../../src/scss/icons.js'), `export default ${icons};\n`, options);
