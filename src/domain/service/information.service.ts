import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class InformationService {
    constructor(
        @Inject('ROUTINES_MODEL') private routinesModel: Model<any>,
    ) { }

    async getLastRoutines(): Promise<any> {
        const routines = await this.routinesModel
            .aggregate()
            .group({ _id: '$type', date: { '$max': '$createdAt' } });

        return routines.map((routine) => {
            return {
                type: routine._id,
                date: routine.date,
            }
        });
    }
}