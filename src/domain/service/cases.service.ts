import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CasesService {
    constructor(
        @Inject('CASES_MODEL') private casesModel: Model<any>,
    ) { }

    async getCurrentListByRoutine(lastRoutine: string): Promise<any[]> {
        return this.casesModel
            .find({ routineIdentifier: lastRoutine })
            .sort({ confirmedCases: -1 })
            .select({ _id: 0, created: 0, __v: 0, routineIdentifier: 0 });
    }

    async getCurrentCasesByIdAndType(id: string, type: string, routineIdentifier: string): Promise<any> {
        return this.casesModel
            .findOne({ id, type, routineIdentifier })
            .select({ _id: 0, created: 0, __v: 0, routineIdentifier: 0 });
    }

    async getCasesHistoryByIdAndType(id: string, type: string): Promise<any[]> {
        return this.casesModel
            .find({ id, type })
            .sort({ created: -1 })
            .select({ _id: 0, created: 0, __v: 0, routineIdentifier: 0 });
    }
}

export enum CaseTypes {
    CITY = 'city',
    STATE = 'state',
    COUNTRY = 'country',
}
