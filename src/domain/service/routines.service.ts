import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Routine } from '../dto/routines.dto';

@Injectable()
export class RoutinesService {
    constructor(
        @Inject('ROUTINES_MODEL') private routinesProviders: Model<any>,
    ) { }

    async getLastRoutineByType(type: RoutineTypes): Promise<Routine> {
        return this.routinesProviders
            .findOne({ type })
            .sort({ createdAt: -1 })
            .select({ _id: 0, id: 1, type: 1 });
    }
}

export enum RoutineTypes {
    CITIES = 'cities',
    STATES = 'states',
    COUNTRIES = 'countries',
    NEWS = 'news',
    GOOD_NEWS = 'good-news',
}