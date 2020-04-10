const winston = require('winston');

const { format } = winston;
const { combine, timestamp, prettyPrint } = format;

const myFormat = combine(
    timestamp(),
    prettyPrint()
);

const logger = winston.createLogger({
    format: myFormat,
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: myFormat
    }));
}

module.exports = logger;
