import winston from 'winston';
import { options } from '@configs/LoggerConfig.json';
import { Config } from '@configs/Config';
import { Constants } from '@configs/Constants';

export class Logger {

    private logger!: winston.Logger;
    private static instance: Logger;

    private constructor() {
        try {
            const czFormat = winston.format.printf(({ level, message, label, timestamp }) => {
                return `${timestamp} [${level}] ${message}`;
            });

            this.logger = winston.createLogger({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    czFormat
                ),
                transports: [
                    new winston.transports.Console(Config.get(Constants.LOGGER_CONFIG).console),
                    new winston.transports.File(Config.get(Constants.LOGGER_CONFIG).file)
                ]
            });
            this.logger.info('Initialized : Logger | Winston');
        } catch (err) {
            console.error('Failed @Logger.ts - constructor');
            console.error(err);
        }
    }

    public static async InitLoggerInstance(): Promise<any> {
        try {
            if (!Logger.instance) {
                Logger.instance = new Logger();
            }
        } catch (err) {
            console.error('Failed @Logger.ts - InitLoggerInstance');
            console.error(err);
        }
    }

    public static getLoggerInstance(): any {
        try {
            if (!Logger.instance) {
                Logger.instance = new Logger();
            }
            return Logger.instance;
        } catch (err) {
            console.error('Failed @Logger.ts - getLoggerInstance');
            console.error(err);
        }
    }

    public static warn(message: any): void {
        try {
            let _logger = Logger.getLoggerInstance();
            _logger.logger.warn(message);
        } catch (err) {
            console.error('Failed @Logger.ts - warn');
            console.error(err);
        }
    }

    public static info(message: any): void {
        try {
            let _logger = Logger.getLoggerInstance();
            _logger.logger.info(message);
        } catch (err) {
            console.error('Failed @Logger.ts - info');
            console.error(err);
        }
    }

    public static error(message: any): void {
        try {
            let _logger = Logger.instance;
            _logger.logger.error(message);
        } catch (err) {
            console.error('Failed @Logger.ts - error');
            console.error(err);
        }
    }

}