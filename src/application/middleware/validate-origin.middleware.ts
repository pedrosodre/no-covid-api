import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import url from 'url';

@Injectable()
export class ValidateOriginMiddleware implements NestMiddleware {
    async use(req: any, res: Response, next: Function) {
        const allowedOrigins: string[] = req.applicationAllowedOrigins;
        if (allowedOrigins && allowedOrigins.length > 0) {
            const origin = req.header('origin');
            if (!origin)
                res.setHeader('Access-Control-Allow-Origin', `https://${allowedOrigins ?.[0]}`);
            else {
                const parseOrigin = url.parse(origin).hostname;
                res.setHeader(
                    'Access-Control-Allow-Origin',
                    allowedOrigins.includes(parseOrigin) ? origin : `https://${allowedOrigins ?.[0]}`
                );
            }
        }
        next();
    }
}
