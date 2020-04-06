
import { Connection } from 'mongoose';
import { RoutinesSchema } from '../../domain/schema/routines.schema';

export const routinesProviders = [
  {
    provide: 'ROUTINES_MODEL',
    useFactory: (connection: Connection) => connection.model('routine', RoutinesSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];