const path = require('path')

process.chdir(path.join(__dirname,'smoke/template'));

describe('test case',() => {
    require('./unit/webpack-base-test');
})