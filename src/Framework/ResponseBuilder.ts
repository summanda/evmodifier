import { Messages } from "@src/Constants/Messages";
import { StatusCodes } from "@src/Constants/StatusCodes";
import { Logger } from "@utils/Logger/Logger";
import { response, Response } from "express";

export class ResponseBuilder {

    private response!: any;
    private static instance: ResponseBuilder;

    private constructor() {
        try {
            this.response = {
                result: null,
                message: null
            };
        } catch (err) {
            Logger.error('Failed @ResponseBuilder.ts - constructor');
            Logger.error(err);
        }
    }

    public static getResponseBuilderInstance(): any {
        try {
            if (!ResponseBuilder.instance) {
                ResponseBuilder.instance = new ResponseBuilder();
            }
            return ResponseBuilder.instance;
        } catch (err) {
            Logger.error('Failed @ResponseBuilder.ts - getResponseBuilderInstance');
            Logger.error(err);
        }
    }

    public static response(data: any, message: any): void {
        try {
            let _response = ResponseBuilder.getResponseBuilderInstance();
            _response.response.result = data;
            _response.response.message = message;
            return _response.response;
        } catch (err) {
            Logger.error('Failed @ResponseBuilder.ts - response');
            Logger.error(err);
        }
    }

    public static error(error?: any): void {
        try {
            let _response = ResponseBuilder.getResponseBuilderInstance();
            _response.response.message = error ? error.message : StatusCodes.STATUS_500.message;
            return _response.response;
        } catch (err) {
            Logger.error('Failed @ResponseBuilder.ts - error');
            Logger.error(err);
        }
    }

}