declare const module: any;

import './apm';

import { documentBuilderOptions } from './doc/swagger';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './application/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(helmet());
    app.enableCors();
    app.set('trust proxy', 1);

    const document = SwaggerModule.createDocument(app, documentBuilderOptions);
    SwaggerModule.setup('', app, document);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
