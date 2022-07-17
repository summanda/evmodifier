require('module-alias/register');
import { Logger } from '@utils/Logger/Logger';
import { server } from './src/Core/Server';

let app = server();

process.on('uncaughtException', function (err) {
    Logger.error('Uncaught Exception');
    Logger.error(err.message);
    Logger.error(err.stack);
    process.exit(1);
});

export const appserver = app;