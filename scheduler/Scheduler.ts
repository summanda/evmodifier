import { EVMUAServiceController } from "@src/Services/EVModifierUpdateAutomation/EVMUA.Service";
import { Logger } from "@utils/Logger/Logger";
const schedule = require('node-schedule');

export async function scheduler(): Promise<any> {
    try {
        const job = schedule.scheduleJob({ hour: 14, minute: 30, dayOfWeek: 0 }, async () => {
            //Schedule the task here
            await EVMUAServiceController.automateService({});
        });
        Logger.info('Scheduler is up');
    }
    catch (err) {
        Logger.error(err);
        Logger.error('Failed to start Scheduler @Scheduler.ts - scheduler');
    }
}