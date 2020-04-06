
import { Connection } from 'mongoose';
import { NewsSchema } from '../../domain/schema/news.schema';

export const newsProviders = [
  {
    provide: 'NEWS_MODEL',
    useFactory: (connection: Connection) => connection.model('news', NewsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];