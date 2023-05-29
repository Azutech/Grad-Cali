import { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, printf, colorize, simple } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

const labelTimestamps = combine(label({ label: 'boom' }), timestamp(), myFormat)

const logger = createLogger({
    level: 'debug',
    format: labelTimestamps,
    exitOnError: false,
    transports: [
        new transports.Console({
            format: combine(
                label({ message: true, label: 'SWIFT-SPUR SERVER!' }),
                colorize(),
                simple()
            ),
        }),
        new transports.File({ filename: 'src/logs/error.log', level: 'error' }),
        new transports.File({ filename: 'src/logs/info.log', level: 'info' }),
        new transports.File({ filename: 'src/logs/debug.log' }),
        new transports.File({ filename: 'src/logs/combined.log' }),
    ],
})

export default logger
