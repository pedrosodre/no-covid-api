/* istanbul ignore file */
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { InformationController } from './controller/information.controller';
import { ApplicationController } from './controller/application.controller';
import { CasesCountriesController } from './controller/cases.countries.controller';
import { CasesStatesController } from './controller/cases.states.controller';
import { CasesCitiesController } from './controller/cases.cities.controller';
import { NewsController } from './controller/news.controller';
import { CasesTotalController } from './controller/cases.total.controller';

import { InformationService } from '../domain/service/information.service';
import { ApplicationService } from '../domain/service/application.service';
import { RoutinesService } from '../domain/service/routines.service';
import { CasesService } from '../domain/service/cases.service';
import { NewsService } from '../domain/service/news.service';

import { databaseProviders } from '../infrastructure/provider/database.provider';
import { casesProviders } from '../infrastructure/provider/cases.provider';
import { goodNewsProviders } from '../infrastructure/provider/good-news.provider';
import { newsProviders } from '../infrastructure/provider/news.provider';
import { routinesProviders } from '../infrastructure/provider/routines.provider';
import { applicationProviders } from '../infrastructure/provider/application.provider';

import { IpRateLimit, TokenRateLimit } from '../application/middleware/rate-limit.middleware';
import { GetApplicationLimitsMiddleware } from './middleware/get-application-limits.middleware';
import { ValidateOriginMiddleware } from './middleware/validate-origin.middleware';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({ secret: process.env.JWT_SECRET }),
    ],
    controllers: [
        InformationController,
        ApplicationController,
        CasesCountriesController,
        CasesStatesController,
        CasesCitiesController,
        NewsController,
        CasesTotalController,
    ],
    providers: [
        ...databaseProviders,
        InformationService,
        ApplicationService,
        RoutinesService,
        CasesService,
        NewsService,
        ...casesProviders,
        ...goodNewsProviders,
        ...newsProviders,
        ...routinesProviders,
        ...applicationProviders,
    ],
    exports: [
        ...databaseProviders,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        const mongoUri = `${process.env.MONGODB_URL}${process.env.DB_NAME}?authSource=admin&w=1`;

        consumer
            .apply(IpRateLimit(
                mongoUri,
                Number(process.env.IP_RATE_LIMIT_PER_MINUTES) * 60 * 1000,
                Number(process.env.IP_RATE_LIMIT_MAX_REQ),
            ))
            .forRoutes(
                ApplicationController,
            );

        consumer
            .apply(GetApplicationLimitsMiddleware)
            .forRoutes(
                CasesCountriesController,
                CasesStatesController,
                CasesCitiesController,
                NewsController,
                InformationController,
            );

        consumer
            .apply(ValidateOriginMiddleware)
            .forRoutes(
                CasesCountriesController,
                CasesStatesController,
                CasesCitiesController,
                NewsController,
                InformationController,
            );

        consumer
            .apply(TokenRateLimit(mongoUri))
            .forRoutes(
                CasesCountriesController,
                CasesStatesController,
                CasesCitiesController,
                NewsController,
                InformationController,
            );
    }
}
