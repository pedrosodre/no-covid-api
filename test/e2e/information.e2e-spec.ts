import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/application/app.module';

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import applicationJson from './test-data/application.json';
import routinesJson from './test-data/routines.json';

describe('Information Endpoints (e2e)', () => {
    let app: INestApplication;
    let mongoServer: MongoMemoryServer;

    const sampleJwt: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV4YW1wbGUtYXBwIiwibmFtZSI6IkV4YW1wbGUgQXBwIiwicmF0ZUxpbWl0IjoxMDAwLCJhbGxvd2VkT3JpZ2lucyI6W10sImlhdCI6MTU4NjMwMTY5N30.IlqC2XQlckXdhJTstBMLqZfDIbG_Bzp8aJHWzuqClO4';

    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        process.env.MONGODB_URL = await mongoServer.getUri();
        process.env.DB_NAME = '';
        process.env.SOURCES = 'Wikipedia|https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic';

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const applicationModel = app.get('APPLICATION_MODEL');
        await applicationModel.create(applicationJson);

        const routinesModel = app.get('ROUTINES_MODEL');
        await routinesModel.insertMany(routinesJson);
    });

    afterAll(async () => {
        await app.close();
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('GET /information/sources', (done) => {
        const response = request(app.getHttpServer())
            .get('/information/sources')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('sources');
                expect(res.body.sources.length).toBe(1);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /information/routines', (done) => {
        const response = request(app.getHttpServer())
            .get('/information/routines')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('lastUpdate');
                expect(res.body.lastUpdate.length).toBe(routinesJson.length);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });
});
