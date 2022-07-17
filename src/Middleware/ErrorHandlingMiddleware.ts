import { Logger } from '@utils/Logger/Logger';
import { Express } from 'express'
import { Response, Request } from 'express'
import { StatusCodes } from '../Constants/StatusCodes'

export class ErrorHandlingMiddleware {

    app!: Express;

    constructor(_app: Express) {
        try {
            this.app = _app;
        } catch (err) {
            Logger.error('Failed @ErrorHandlingMiddleware.ts - constructor');
            Logger.error(err);
        }
    }

    public async handle404Error(): Promise<any> {
        try {
            this.app.use((req: Request, resp: Response) => {
                resp.status(StatusCodes.STATUS_404.code).send(StatusCodes.STATUS_404.message);
            });
        } catch (err) {
            Logger.error('Failed @ErrorHandlingMiddleware.ts - handle404Error');
            Logger.error(err);
        }
    }

}