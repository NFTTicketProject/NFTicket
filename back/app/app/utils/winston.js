const winston = require('winston');
const { createLogger, format, transports } = winston;
const winstonDaily = require('winston-daily-rotate-file');
const { combine, timestamp, printf } = format;

const customFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        customFormat,
    ),
    transports: [
        new transports.Console(),
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYYMMDD',
            dirname: './logs',
            filename: `NFTicket_%DATE%.log`,
            maxSize: null,
            maxFiles: 14
        }),
    ],
});

const stream = {
    write: message => {
      logger.info(message)
    }
}

module.exports = { logger, stream };