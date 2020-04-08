import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/application/app.module';

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import casesJson from './test-data/cases.json';
import applicationJson from './test-data/application.json';
import routinesJson from './test-data/routines.json';

describe('Cases Endpoints (e2e)', () => {
    let app: INestApplication;
    let mongoServer: MongoMemoryServer;

    const sampleJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV4YW1wbGUtYXBwIiwibmFtZSI6IkV4YW1wbGUgQXBwIiwicmF0ZUxpbWl0IjoxMDAwLCJhbGxvd2VkT3JpZ2lucyI6W10sImlhdCI6MTU4NjMwMTY5N30.IlqC2XQlckXdhJTstBMLqZfDIbG_Bzp8aJHWzuqClO4';

    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        process.env.MONGODB_URL = await mongoServer.getUri();
        process.env.DB_NAME = '';
        
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const applicationModel = app.get('APPLICATION_MODEL');
        await applicationModel.create(applicationJson);

        const routinesModel = app.get('ROUTINES_MODEL');
        await routinesModel.insertMany(routinesJson);
        
        const casesModel = app.get('CASES_MODEL');
        await casesModel.insertMany(casesJson);
    });

    afterAll(async () => {
        await app.close();
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('GET /cases/countries', (done) => {
        const response = request(app.getHttpServer())
            .get('/cases/countries')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body?.countries.length).toBe(1);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /cases/countries/{country}', (done) => {
        const response = request(app.getHttpServer())
            .get('/cases/countries/brazil')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body?.country?.id).toBe('brazil');
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /cases/countries/{country}/history', (done) => {
        const response = request(app.getHttpServer())
            .get('/cases/countries/brazil/history')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body?.history.length).toBe(1);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /cases/states', (done) => {
        const response = request(app.getHttpServer())
            .get('/cases/states')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body?.states.length).toBe(1);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /cases/states/{state}', (done) => {
        const response = request(app.getHttpServer())
            .get('/cases/states/minas-gerais')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body?.state?.id).toBe('minas-gerais');
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /cases/states/{state}/history', (done) => {
        const response = request(app.getHttpServer())
            .get('/cases/states/minas-gerais/history')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body?.history.length).toBe(1);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /cases/cities', (done) => {
        const response = request(app.getHttpServer())
            .get('/cases/cities')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body?.cities.length).toBe(1);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /cases/cities/{city}', (done) => {
        const response = request(app.getHttpServer())
            .get('/cases/cities/belo-horizonte')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body?.city?.id).toBe('belo-horizonte');
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /cases/cities/{city}/history', (done) => {
        const response = request(app.getHttpServer())
            .get('/cases/cities/belo-horizonte/history')
            .set({ Authorization: `Bearer ${sampleJwt}` })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body?.history.length).toBe(1);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });
});
