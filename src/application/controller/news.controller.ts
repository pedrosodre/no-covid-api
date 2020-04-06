import { 
    Controller,
    Param,
    Get,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NewsService } from '../../domain/service/news.service';
import { NewsList } from './news';
import { BearerAuthGuard } from '../../infrastructure/guard/bearer-auth.guard';

@ApiTags('News')
@Controller('news')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
export class NewsController {
    constructor(
        private readonly newsService: NewsService,
    ) {}

    @Get(':countryCode')
    @ApiOkResponse({
        description: 'Recupera a lista de notícias de um país relacionadas a pandemia do COVID-19.',
        type: NewsList,
    })
    async getNews(
        @Param('countryCode') countryCode: string,
    ): Promise<any> {
        const news = await this.newsService.getNewsByCountryCode(countryCode.toUpperCase());
 
        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            length: news.length,
            news,
        };
    }

    @Get(':countryCode/:limit')
    @ApiOkResponse({
        description: 'Recupera a lista de notícias de um país relacionadas a pandemia do COVID-19 dado um limite de notícias.',
        type: NewsList,
    })
    async getNewsWithLimit(
        @Param('countryCode') countryCode: string,
        @Param('limit') limit: string,
    ): Promise<any> {
        const news = await this.newsService.getNewsByCountryCode(countryCode.toUpperCase(), Number(limit));
 
        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            length: news.length,
            news,
        };
    }

    @Get('good/:countryCode')
    @ApiOkResponse({
        description: 'Recupera a lista de notícias boas de um país relacionadas a pandemia do COVID-19.',
        type: NewsList,
    })
    async getGoodNews(
        @Param('countryCode') countryCode: string,
    ): Promise<any> {
        const news = await this.newsService.getGoodNewsByCountryCode(countryCode.toUpperCase());
 
        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            length: news.length,
            news,
        };
    }

    @Get('good/:countryCode/:limit')
    @ApiOkResponse({
        description: 'Recupera a lista de notícias boas de um país relacionadas a pandemia do COVID-19 dado um limite de notícias.',
        type: NewsList,
    })
    async getGoodNewsWithLimit(
        @Param('countryCode') countryCode: string,
        @Param('limit') limit: string,
    ): Promise<any> {
        const news = await this.newsService.getGoodNewsByCountryCode(countryCode.toUpperCase(), Number(limit));
 
        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            length: news.length,
            news,
        };
    }
}
