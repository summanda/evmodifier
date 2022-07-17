require('module-alias/register');
import { Logger } from '@utils/Logger/Logger';
import { scheduler } from './scheduler/Scheduler';

let schedulerapp = scheduler();

process.on('uncaughtException', function (err) {
    Logger.error('Uncaught Exception');
    Logger.error(err.message);
    Logger.error(err.stack);
    process.exit(1);
});

export const schedulerAppNode = schedulerapp;