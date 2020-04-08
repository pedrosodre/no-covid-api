import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NewApplicationDto } from '../dto/application.dto';
import { kebabCase } from 'lodash';
import { Model } from 'mongoose';
import crypto from 'crypto';
import { ApplicationDetails } from '../../application/controller/application';

export enum ApplicationTypes {
    CLIENT_SIDE = 'client-side',
    SERVER_SIDE = 'server-side',
}

@Injectable()
export class ApplicationService {
    constructor(
        @Inject('APPLICATION_MODEL') private applicationModel: Model<any>,
        private jwtService: JwtService,
    ) { }

    async setApplication(newApplicationDto: NewApplicationDto, ip: string): Promise<ApplicationDetails> {
        const applicationId = kebabCase(newApplicationDto.name);
        const applicationKey = crypto.randomBytes(8).toString('hex');
        const applicationSecret = crypto.randomBytes(24).toString('hex');

        const applicationById = await this.applicationModel.findOne({ id: applicationId });
        const applicationByEmail = await this.applicationModel.findOne({ ownerEmail: newApplicationDto.ownerEmail });

        if (applicationById || applicationByEmail) throw new ConflictException();

        await this.applicationModel.create({
            id: applicationId,
            name: newApplicationDto.name,
            ip,
            key: applicationKey,
            secret: applicationSecret,
            type: newApplicationDto.type,
            requestOrigin: newApplicationDto.requestOrigin || [],
            rateLimit: this.getRateLimitBasedOnType(newApplicationDto.type),
            ownerName: newApplicationDto.ownerName,
            ownerEmail: newApplicationDto.ownerEmail,
        });

        return {
            id: applicationId,
            key: applicationKey,
            secret: applicationSecret,
        };
    }

    authorize(application: any): any {
        return this.jwtService.sign({
            id: application.id,
            name: application.name,
            rateLimit: application.rateLimit,
            allowedOrigins: application.requestOrigin,
        });
    }

    async blacklistJwt(id: string, jwt: string): Promise<void> {
        return this.applicationModel.updateOne({ id }, { $push: { jwtBlacklist: jwt } })
    }

    private getRateLimitBasedOnType(type: string): number {
        if (type === ApplicationTypes.CLIENT_SIDE) return Number(process.env.DEFAULT_FRONTEND_RATE_LIMIT);
        if (type === ApplicationTypes.SERVER_SIDE) return Number(process.env.DEFAULT_BACKEND_RATE_LIMIT);
        return 0;
    }
}