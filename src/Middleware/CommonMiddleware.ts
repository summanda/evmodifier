import { Logger } from '@utils/Logger/Logger';
import { Express } from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');

export class CommonMiddleware {

    app!: Express;

    constructor(_app: Express) {
        try {
            this.app = _app;
        } catch (err) {
            Logger.error('Failed @CommonMiddleware.ts - constructor');
            Logger.error(err);
        }
    }

    public async useBodyParser(): Promise<any> {
        try {
            this.app.use(bodyParser.json());
        } catch (err) {
            Logger.error('Failed @CommonMiddleware.ts - useBodyParser');
            Logger.error(err);
        }
    }

    public async useURLencoded(): Promise<any> {
        try {
            this.app.use(
                bodyParser.urlencoded({
                    extended: true
                })
            );
        } catch (err) {
            Logger.error('Failed @CommonMiddleware.ts - useURLencoded');
            Logger.error(err);
        }
    }

    public async useCors(): Promise<any> {
        try {
            this.app.use(cors());
        } catch (err) {
            Logger.error('Failed @CommonMiddleware.ts - useCors');
            Logger.error(err);
        }
    }

    public async logRequests(): Promise<any> {
        try {
            this.app.use((req, res, done) => {
                Logger.info(req.originalUrl)
                done();
            });
        } catch (err) {
            Logger.error('Failed @CommonMiddleware.ts - logRequests');
            Logger.error(err);
        }
    }

}