const debug = require('debug')('dev');
const http = require('http');
const app = require('./app');

const PORT = process.env.NODE_ENV === 'test' ? 6378 : process.env.PORT || 8000;

process.on('uncaughtException', (error) => {
  debug(`uncaught exception: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  debug(`unhandled rejection at ${promise}, reason: ${reason}`);
  process.exit(1);
});

const server = http.createServer(app);

server.listen(PORT, () => {
  debug(`server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode.\nPress CTRL-C to stop`);
});
