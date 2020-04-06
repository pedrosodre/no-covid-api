
import { Connection } from 'mongoose';
import { GoodNewsSchema } from '../../domain/schema/good-news.schema';

export const goodNewsProviders = [
  {
    provide: 'GOOD_NEWS_MODEL',
    useFactory: (connection: Connection) => connection.model('good_news', GoodNewsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];