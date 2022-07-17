import { Config } from '@configs/Config';
import { Constants } from '@configs/Constants';
import { StatusCodes } from '@src/Constants/StatusCodes';
import { ResponseBuilder } from '@src/Framework/ResponseBuilder';
import { HttpClient } from '@utils/HttpClient/HttpClient';
import { Logger } from '@utils/Logger/Logger';
import { Mailer } from '@utils/Mailer/Mailer';

import * as fs from 'fs-extra';
import { EVMUAConstants } from './EVMUA.Constant';

const cheerio = require('cheerio');
const path = require('path');

export class EVMUAServiceController {

    public static async automateService(req: any, res?: any): Promise<any> {
        try {

            if (Config.get(Constants.FEATURE_ENABLED) == 'false') {
                return ResponseBuilder.response(null, EVMUAConstants.FEATURE_DISABLED);
            }

            if (!req.body.email) {
                res.status(StatusCodes.STATUS_400.code).send(ResponseBuilder.error({ code: StatusCodes.STATUS_400.code, message: EVMUAConstants.VALIDATION_ERRO_EMAIL }));
            }

            let result = await HttpClient.get(Config.get(Constants.FUEL_ECONOMY_PORTAL));
            const $ = cheerio.load(result.data);
            let updatedOn = $.html().substring(
                $.html().indexOf(':', $.html().indexOf('Updated')) + 1,
                $.html().indexOf(')', $.html().indexOf('Updated'))
            ).trim();

            let lastUpdatedOn = await fs.readFile(Config.get(Constants.STORAGE_URL), 'utf8');

            let dateSite = new Date(updatedOn);
            let dateStore = new Date(lastUpdatedOn);

            if (dateSite.getTime() != dateStore.getTime()) {
                const params = { user: req.body.email, email: req.body.email };
                if (Config.get(Constants.AKKA_API_ENABLED) == 'true') {
                    let result1 = await HttpClient.get(Config.get(Constants.AKKA_API_UPDATE_VEHICLE_IN_MODEL_DB), { params: params });
                    let result2 = await HttpClient.get(Config.get(Constants.AKKA_API_RELEASE_VEHICLE_TO_PROD_DB), { params: params });
                }
                await fs.writeFile(Config.get(Constants.STORAGE_URL), updatedOn);
                if (Config.get(Constants.NOTIFICATION_EMAIL_ENABALED)) Mailer.send(EVMUAConstants.NOTIFICATION_EMAIL_BODY);
                return ResponseBuilder.response({ newUpdatedDate: updatedOn }, EVMUAConstants.CHANGE_DETECTED);
            }
            else {
                return ResponseBuilder.response(null, EVMUAConstants.NO_CHANGE_DETECTED);
            }

        } catch (err) {
            Logger.error('Failed @EVMUA.Service.ts @EVMUAServiceController - automateService');
            Logger.error(err);
            if (!res.headerSent) res.status(StatusCodes.STATUS_500.code).send(ResponseBuilder.error());
        }
    }

}