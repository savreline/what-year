import config from  './config';
import express from 'express';
import apiRouter from './api';
import bodyParser from 'body-parser';
const server = express();

server.set('view engine', 'ejs');
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.render('index', {
    content: 'Loading...'
  });
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, () => {
  console.info('Express listening on port ', config.port);
});
