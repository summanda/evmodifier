const express = require('express');
import { Express } from 'express';
import { Logger } from '@utils/Logger/Logger';
import { InitMiddleWare } from './InitMiddleware';
import { InitRoutes } from './InitRoutes';
import { HttpClient } from '@utils/HttpClient/HttpClient';
import { Config } from '@configs/Config';
import { Constants } from '@configs/Constants';

export async function server(): Promise<any> {
    try {
        let app: Express = express();

        let protocol: any = Config.get(Constants.PROTOCOL);
        let host: any = Config.get(Constants.HOST);
        let port: any = Config.get(Constants.PORT);
        let apiBaseUrl: any = Config.get(Constants.API_BASE_URL);

        let hostAddress: any = `${protocol}://${host}:${port.toString()}`;

        await InitMiddleWare.InitCommonMiddleware(app);
        await InitRoutes.Init(app, apiBaseUrl);
        await InitMiddleWare.InitErrorHandlingMiddleware(app);
        await HttpClient.InitHttpClientInstance();

        app.listen(port, host, () => {
            Logger.info(`Server started listening at ${hostAddress}`);
        });

        return Promise.resolve(app);
    } catch (err) {
        console.error('Failed @Server.ts');
        console.error(err);
    }
}