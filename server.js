const http = require('http')
const app = require('./app')
const port = 'english-azerbaijan-dictionary-api' || 3000;

const server = http.createServer(app);


server.listen(port);
