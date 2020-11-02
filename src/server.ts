import express from 'express';
import log4js from 'log4js';

const logger = log4js.configure({
    appenders: {
        access: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['access'],
            level: 'info'
        }
    }
}).getLogger('access');

const app = express();

app.enable('trust proxy');

app.use(log4js.connectLogger(logger, { level: 'info' }));

app.use('/', (req, res, next) => {
    const log = {
        'req.ip': req.ip,
        'req.socket.remoteAddress': req.socket.remoteAddress,
        'req.socket.remotePort': req.socket.remotePort,
        'req.ips': req.ips
    };
    res.send(JSON.stringify(log, null, 2));
});

const port = process.env.PORT || 80;
app.listen(Number(port), '0.0.0.0', () => { console.log(`start: http://localhost:${port}`) })
