const express = require('express');
const app = express();
const port = 3000;
const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
         new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    ]
});

logger.info('What rolls down stairs');
logger.info('alone or in pairs,');
logger.info('and over your neighbors dog?');
logger.warn('Whats great for a snack,');
logger.info('And fits on your back?');
logger.error('Its log, log, log');
const handler = (func) => (req, res) => {
    try {
        logger.info('server.handler.begun');
        func(req, res, logger);
    } catch(e){
        logger.info('server.handler.failed');
        res.send('Oh no, something did not go well!');
    }
};
//---------------------------------------------------------------
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit();
  });
  //--------------------------------------------------------
app.get('/success', handler((req, res) => { res.send('Yay!'); }))
app.get('/error', handler((req, res) => { throw new Error('Doh!'); }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))