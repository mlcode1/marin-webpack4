if(typeof window === 'undefined'){
    global.window = {};
}
const fs = require('fs')
const path = require('path')
const express = require('express')
const {renderToString} = require('react-dom/server')
const SSR = require('../dist/js/search-server')
// console.log(SSR)

const template = fs.readFileSync(path.join(__dirname,'../dist/page/search.html'),'utf-8')

const server = (port) => {
    const app = express();

    app.use(express.static("dist"));
    app.get('/favicon.ico',(req,res) => {
        return ;
    })

    app.get('/search',(req,res) => {
        // console.log(SSR)
        res.status(200).send(renderMarkup(renderToString(SSR)))
    });

    app.listen(port,() => {
        console.log('服务器已启动在端口:'+port)
    })
}


server(process.env.PORT || 3000);

const renderMarkup = (html) => {
    return template.replace("<!-- HTML_MARIN -->",html)
} 