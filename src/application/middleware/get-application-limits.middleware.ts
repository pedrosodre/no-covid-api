import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GetApplicationLimitsMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
    ) { }

    async use(req: any, _res: Response, next: Function) {
        req.application = null;
        const authorization = req.header('Authorization');

        if (authorization) {
            const auth = authorization.split(' ');
            const authType = auth ?.[0];
            const authJwt = auth ?.[1];

            if (authType === 'Bearer' && authJwt) {
                try {
                    this.jwtService.verify(authJwt);
                    const decodedJwt: any = this.jwtService.decode(authJwt);
                    req.applicationId = decodedJwt.id;
                    req.applicationRateLimit = decodedJwt.rateLimit;
                    req.applicationAllowedOrigins = decodedJwt.allowedOrigins;
                } catch (err) {
                    // Nothing
                }
            }
        }

        next();
    }
}
