const glob = require('glob-all');
describe('check generated html files',() => {
    it('should generate html files',(done) => {
        const files = glob.sync([
            './dist/page/*.html'
        ]);

        if(files.length > 0){
            done();
        }else{
            throw new Error('no html files generated');
        }
    });
})