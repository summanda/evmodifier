import { AbstractRouteController } from '@src/Core/AbstractRouteController';
import { Response, Request } from 'express';
import { StatusCodes } from '../../Constants/StatusCodes';
import { EVMUARoutes } from '@configs/APIConfig.json';
import { EVMUAServiceController } from './EVMUA.Service';
import { Logger } from '@utils/Logger/Logger';
import { Authentication } from '@src/Middleware/Authentication';
import { ResponseBuilder } from '@src/Framework/ResponseBuilder';
import { EVMUAConstants } from './EVMUA.Constant';

export class EVMUARouteController extends AbstractRouteController {

    constructor() {
        super();
        this.path = EVMUARoutes.baseResource;
        this.InitRoutes();
    }

    public async InitRoutes() {
        await this.automateRoute(`${this.path}${EVMUARoutes.routes.automate}`);
    }

    public async automateRoute(routePath: string): Promise<any> {
        try {
            this.router.post(routePath, Authentication.authenticate, async (req: Request, res: Response) => {
                let response = await EVMUAServiceController.automateService(req, res);
                if (!res.headersSent) {
                    res.status(StatusCodes.STATUS_200.code).send(response);
                }
            });
        } catch (err) {
            Logger.error('Failed @EVMUA.Route.ts @EVMUARouteController - automateRoute');
            Logger.error(err);
        }
    }

}