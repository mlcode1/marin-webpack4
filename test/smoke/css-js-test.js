const glob = require('glob-all');
describe('check generated css js files',() => {
    it('should generate css js files',(done) => {
        const files = glob.sync([
            './dist/js/*.js',
            './dist/css/*.css'
        ]);

        if(files.length > 0){
            done();
        }else{
            throw new Error('no css js files generated');
        }
    });
})