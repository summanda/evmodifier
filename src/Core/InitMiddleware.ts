import { Logger } from '@utils/Logger/Logger';
import { Express } from 'express';
import { CommonMiddleware } from '../Middleware/CommonMiddleware';
import { ErrorHandlingMiddleware } from '../Middleware/ErrorHandlingMiddleware';

export class InitMiddleWare {

    public static async InitCommonMiddleware(app: Express): Promise<any> {
        try {
            let middleware = new CommonMiddleware(app);
            await middleware.useBodyParser();
            await middleware.useURLencoded();
            await middleware.useCors();
            await middleware.logRequests();
            Logger.info('Initialized : Common Middlewares');
        } catch (err) {
            Logger.error('Failed @InitMiddleware.ts - InitCommonMiddleware');
            Logger.error(err);
        }
    }

    public static async InitErrorHandlingMiddleware(app: Express): Promise<any> {
        try {
            let errorMiddleware = new ErrorHandlingMiddleware(app);
            await errorMiddleware.handle404Error();
            Logger.info('Initialized : ErrorHandlingMiddleware');
        } catch (err) {
            Logger.error('Failed @InitMiddleware.ts - InitCommonMiddleware');
            Logger.error(err);
        }
    }

}