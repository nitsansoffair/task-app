const winston = require('winston');

const { format } = winston;
const { combine, timestamp, prettyPrint } = format;

const myFormat = combine(
    timestamp(),
    prettyPrint()
);

const index = winston.createLogger({
    format: myFormat,
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.File({ filename: './src/logger/logs/combined.log' }),
        new winston.transports.File({ filename: './src/logger/logs/error.log', level: 'error' }),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    index.add(new winston.transports.Console({
        format: myFormat
    }));
}

module.exports = index;
