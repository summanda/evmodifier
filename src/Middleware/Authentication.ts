import { Config } from "@configs/Config";
import { Constants } from "@configs/Constants";
import { Messages } from "@src/Constants/Messages";
import { StatusCodes } from "@src/Constants/StatusCodes";
import { ResponseBuilder } from "@src/Framework/ResponseBuilder";
import { Logger } from "@utils/Logger/Logger";

export class Authentication {

    public static authenticate(req: any, res: any, next: any): any {
        try {
            let environmentSecret = Config.get(Constants.CLIENT_ONE_TIME_SECRET);
            if (req.headers['x-static-secret'] && req.headers['x-static-secret'] == environmentSecret) {
                next();
            }
            else {
                throw Messages.AUTH_FAIL;
            }
        }
        catch (err) {
            Logger.error('Failed @Authentication.ts - authenticate');
            Logger.error(err);
            if (!res.headerSent) res.status(StatusCodes.STATUS_403.code).send(ResponseBuilder.error({ code: StatusCodes.STATUS_403.code, message: Messages.AUTH_FAIL }));
        }
    }

}