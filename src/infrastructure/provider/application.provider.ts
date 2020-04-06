
import { Connection } from 'mongoose';
import { ApplicationSchema } from '../../domain/schema/application.schema';

export const applicationProviders = [
  {
    provide: 'APPLICATION_MODEL',
    useFactory: (connection: Connection) => connection.model('application', ApplicationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];