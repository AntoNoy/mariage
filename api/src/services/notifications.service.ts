import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class NotificationService {
    private smsFreeCredentials: { user: string; pass: string }[] = []
    constructor(
        private readonly configService: ConfigService<{ 'SMS_NOTIFICATION_CREDENTIALS': string }, true>,
    ) {
        this.smsFreeCredentials = this.configService.get<string>('SMS_NOTIFICATION_CREDENTIALS').split(',').map(data => {
            const credentials = data.split(':')
            return {
                user: credentials[0],
                pass: credentials[1]
            }
        })
    }


    async sendSmsByFree(msg: string) {
        await Promise.all(
            this.smsFreeCredentials.map(account => {
                const url = `https://smsapi.free-mobile.fr/sendmsg?user=${account.user}&pass=${account.pass}&msg=${msg}`
                return axios.post(url)
            })
        )
    }
}