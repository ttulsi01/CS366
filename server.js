const https = require('https');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const httpsOptions = {
    key: fs.readFileSync('./security/server.key'),
    cert: fs.readFileSync('./security/server.crt')
  }

function requests(req, res) {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/main.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    filePath = path.resolve('./public/404.html');
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filePath).pipe(res);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else if (fileExt == '.css') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            fs.createReadStream(filePath).pipe(res);
        }
        else if (fileExt == '.js') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/javascript');
            fs.createReadStream(filePath).pipe(res);
        }
        else if (fileExt == '.map') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/octet-stream');
            fs.createReadStream(filePath).pipe(res);
        }
        else if (fileExt == '.png') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'image/png');
            fs.createReadStream(filePath).pipe(res);
        }
        else if (fileExt == '.jpg') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'image/jpg');
            fs.createReadStream(filePath).pipe(res);
        }
        else if (fileExt == '.ico') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'image/ico');
            fs.createReadStream(filePath).pipe(res);
        }
        else {
            filePath = path.resolve('./public/404.html');
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
        }
    }
    else {
        filePath = path.resolve('./public/404.html');
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
    }
}

const server = https.createServer(httpsOptions, requests)

server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});