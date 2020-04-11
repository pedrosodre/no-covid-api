import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

@Injectable()
export class BearerAuthGuard implements CanActivate {
    constructor(
        @Inject('APPLICATION_MODEL') private applicationModel: Model<any>,
        private jwtService: JwtService,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.header('Authorization');
        if (!authorization) return false;

        const auth = authorization.split(' ');
        const authType = auth[0];
        const authJwt = auth[1];

        if (authType !== 'Bearer' || !authJwt) return false;

        try {
            this.jwtService.verify(authJwt);
            const decodedJwt: any = this.jwtService.decode(authJwt);
            const application = await this.applicationModel.findOne({ id: decodedJwt.id, active: true });
            if (!application) return false;

            request.application = application;
        } catch (err) {
            return false;
        }

        return true;
    }
}