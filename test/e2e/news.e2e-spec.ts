import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/application/app.module';

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import applicationJson from './test-data/application.json';
import routinesJson from './test-data/routines.json';
import newsJson from './test-data/news.json';
import goodNewsJson from './test-data/good-news.json';

describe('News Endpoints (e2e)', () => {
    let app: INestApplication;
    let mongoServer: MongoMemoryServer;
    let sampleJwt: string;

    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        process.env.MONGODB_URL = await mongoServer.getUri();
        process.env.DEFAULT_AMOUNT_RESULTS = '12';
        process.env.DB_NAME = '';

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const applicationModel = app.get('APPLICATION_MODEL');
        await applicationModel.create(applicationJson);

        const encodedAuth = Buffer.from(`${applicationJson.key}:${applicationJson.secret}`, 'ascii').toString('base64');
        const jwtResponse = await request(app.getHttpServer())
            .post('/application/token')
            .set('Authorization', `Basic ${encodedAuth}`);
        sampleJwt = jwtResponse.body?.application?.jwt;

        const routinesModel = app.get('ROUTINES_MODEL');
        await routinesModel.insertMany(routinesJson);

        const newsModel = app.get('NEWS_MODEL');
        await newsModel.insertMany(newsJson);

        const goodNewsModel = app.get('GOOD_NEWS_MODEL');
        await goodNewsModel.insertMany(goodNewsJson);
    });

    afterAll(async () => {
        await app.close();
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('GET /news/{countryCode}', (done) => {
        const response = request(app.getHttpServer())
            .get('/news/BR')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('news');
                expect(res.body.news.length).toBe(newsJson.length);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /news/{countryCode}/{limit}', (done) => {
        const response = request(app.getHttpServer())
            .get('/news/BR/1')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('news');
                expect(res.body.news.length).toBe(1);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /news/good/{countryCode}', (done) => {
        const response = request(app.getHttpServer())
            .get('/news/good/BR')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('news');
                expect(res.body.news.length).toBe(goodNewsJson.length);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /news/good/{countryCode}/{limit}', (done) => {
        const response = request(app.getHttpServer())
            .get('/news/good/BR/1')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('news');
                expect(res.body.news.length).toBe(1);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });
});
