
import { Connection } from 'mongoose';
import { CasesSchema } from '../../domain/schema/cases.schema';

export const casesProviders = [
  {
    provide: 'CASES_MODEL',
    useFactory: (connection: Connection) => connection.model('cases', CasesSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];