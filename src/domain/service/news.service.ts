import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { News } from '../dto/news.dto';

@Injectable()
export class NewsService {
    private DEFAULT_LIMIT: number;

    constructor(
        @Inject('NEWS_MODEL') private newsModel: Model<any>,
        @Inject('GOOD_NEWS_MODEL') private goodNewsModel: Model<any>,
    ) {
        this.DEFAULT_LIMIT = Number(process.env.DEFAULT_AMOUNT_RESULTS);
    }

    async getNewsByCountryCode(countryCode: string, limit: number = this.DEFAULT_LIMIT): Promise<News[]> {
        return this.newsModel
            .find({ countryCode })
            .sort({ publishedAt: -1 })
            .limit(limit)
            .select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0, routineIdentifier: 0 });
    }

    async getGoodNewsByCountryCode(countryCode: string, limit: number = this.DEFAULT_LIMIT): Promise<News[]> {
        return this.goodNewsModel
            .find({ countryCode })
            .sort({ publishedAt: -1 })
            .limit(limit)
            .select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0, routineIdentifier: 0 });
    }
}