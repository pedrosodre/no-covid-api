import {
    Injectable,
    Inject,
    CanActivate,
    ExecutionContext,
} from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class BasicAuthGuard implements CanActivate {
    constructor(
        @Inject('APPLICATION_MODEL') private applicationModel: Model<any>,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.header('Authorization');
        if (!authorization) return false;

        const auth = authorization.split(' ');
        const authType = auth[0];
        const authKeys = auth[1] && Buffer.from(auth[1], 'base64').toString('ascii').split(':');
        
        const authKey = authKeys?.[0];
        const authSecret = authKeys?.[1];
        
        if (
            authType !== 'Basic' ||
            !authKey || !authSecret
        ) return false;

        const application = await this.applicationModel.findOne({ key: authKey, secret: authSecret, active: true });
        if (!application) return false;

        request.application = application;

        return true;
    }
}