import {
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import mongoStore from 'rate-limit-mongo';
import { Request, Response, NextFunction } from 'express';

export const IpRateLimit = (mongoUri: string, ms: number, max: number) => rateLimit({
    windowMs: ms,
    max,
    headers: true,
    handler: (_req: Request, _res: Response, next: NextFunction) => {
        next(new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS));
    },
    store: new mongoStore({
        uri: mongoUri,
        expireTimeMs: ms,
    }),
});

export const TokenRateLimit = (mongoUri: string) => rateLimit({
    windowMs: 1 * 60 * 1000,
    max: (req: any) => {
        return req.applicationRateLimit || 3;
    },
    keyGenerator: (req: any) => {
        return req.applicationId || `not_authorized_${req.ip}`;
    },
    headers: true,
    handler: (_req: Request, _res: Response, next: NextFunction) => {
        next(new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS));
    },
    store: new mongoStore({
        uri: mongoUri,
        expireTimeMs: 1 * 60 * 1000,
    }),
});