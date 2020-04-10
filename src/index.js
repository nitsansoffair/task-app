const fs = require('fs');
const https = require('https');

const app = require('./app');
const logger = require('./logger');

const privateKey = fs.readFileSync('./src/ssl/key.pem');
const certificate = fs.readFileSync('./src/ssl/server.crt');

const port = process.env.PORT;

https
    .createServer({ key: privateKey, cert: certificate }, app)
    .listen(port, () => {
        logger.info(`Server is up on port ${port}`);
    });
