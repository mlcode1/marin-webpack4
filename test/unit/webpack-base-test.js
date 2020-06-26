const assert = require('assert')

describe('webpack.base.js test case',() => {
    
    const baseConfig = require('../../lib/webpack.base')
    // console.log(baseConfig)
    it('entry',() => {
        assert.equal(baseConfig.entry.index,'D:/webstorm/basic/ehsplus-webpack/test/smoke/template/src/js/index.js');
        assert.equal(baseConfig.entry.search,'D:/webstorm/basic/ehsplus-webpack/test/smoke/template/src/js/search.js');
    })
})