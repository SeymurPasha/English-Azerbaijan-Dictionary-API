const http = require('http')
const app = require('./app')
const port = process.env.PORT || 3000;
if (port == null || port == "") {
    port = 8000;
  }
const server = http.createServer(app);

console.log(port);
server.listen(port);
