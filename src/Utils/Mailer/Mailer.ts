import { Logger } from '@utils/Logger/Logger';

const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');

export class Mailer {

    private mailer!: any;
    private static instance: Mailer;

    private constructor() {
        try {
            this.mailer.transport = nodemailer.createTransport({
                SES: new AWS.SES({
                    apiVersion: '2010-12-01',
                    region: 'us-west-2'
                }),
            });
            Logger.info('Initialized : Mailer | Node Mailer with AWS SSE Encryption');
        } catch (err) {
            Logger.error('Failed @Mailer.ts - constructor');
            Logger.error(err);
        }
    }

    public static async InitMailerInstance(): Promise<any> {
        try {
            if (!Mailer.instance) {
                Mailer.instance = new Mailer();
            }
        } catch (err) {
            Logger.error('Failed @Mailer.ts - InitMailerInstance');
            Logger.error(err);
        }
    }

    public static getMailerInstance(): any {
        try {
            if (!Mailer.instance) {
                Mailer.instance = new Mailer();
            }
            return Mailer.instance;
        } catch (err) {
            Logger.error('Failed @Mailer.ts - getMailerInstance');
            Logger.error(err);
        }
    }

    public static async send(message: any): Promise<any> {
        try {
            let _mailer = Mailer.getMailerInstance();
            let transport = _mailer.mailer.transport;
            const mailerOptions = {
                from: 'noreply@gridx.com',
                to: 'to' || 'REPORT_EMAIL_LIST',
                subject: 'subject',
                html: 'msg',
            };
            // if ('bcc') {
            //     mailerOptions.bcc = bcc;
            // }
            const result = await transport.sendMail(mailerOptions);
            return result;
        } catch (err) {
            Logger.error('Failed @Mailer.ts - send');
            Logger.error(err);
        }
    }

}