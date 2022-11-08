import {createLogger, format, transports} from 'winston';

const enumerateErrorFormat = format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

export const logger = createLogger({
    level: process.env.NODE_ENV === 'dev' ? 'debug' : 'info',
    format: format.combine(
        enumerateErrorFormat(),
        process.env.NODE_ENV === 'dev' ? format.colorize() : format.uncolorize(),
        format.timestamp(),
        format.splat(),
        // format.printf(({ timestamp, level, message, metadata }) => {
        //     return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(
        //         metadata
        //     )}`;
        // })
        format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
    ),
    transports: [
        new transports.Console({
            stderrLevels: ['error'],
        }),
    ],
});
