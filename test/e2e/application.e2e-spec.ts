import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/application/app.module';

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('ApplicationController (e2e)', () => {
    let app: INestApplication;
    let mongoServer: MongoMemoryServer;

    let application: any;
    let jwt: any;

    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        process.env.MONGODB_URL = await mongoServer.getUri();
        process.env.DB_NAME = '';
    });

    afterAll(async () => {
        await app.close();
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /application', (done) => {
        const response = request(app.getHttpServer())
            .post('/application')
            .send({
                name: "Example App",
                type: "server-side",
                requestOrigin: [],
                ownerName: "Example Name",
                ownerEmail: "example@example.com",
            })
            .end((err, res) => {
                if (err) return done(err);
                application = res.body.application;
                done();
            });

        response
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it('POST /application/token', (done) => {
        const encodedAuth = new Buffer(`${application.key}:${application.secret}`).toString('base64');
        const response = request(app.getHttpServer())
            .post('/application/token')
            .set('Authorization', `Basic ${encodedAuth}`)
            .send({
                name: "Example App",
                type: "server-side",
                requestOrigin: [],
                ownerName: "Example Name",
                ownerEmail: "example@example.com",
            })
            .end((err, res) => {
                if (err) return done(err);
                jwt = (res.body.application && res.body.application.jwt) || null;
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('PATCH /application/token/blacklist', (done) => {
        const encodedAuth = new Buffer(`${application.key}:${application.secret}`).toString('base64');
        const response = request(app.getHttpServer())
            .patch('/application/token/blacklist')
            .set('Authorization', `Basic ${encodedAuth}`)
            .send({ jwt })
            .end((err) => {
                if (err) return done(err);
                done();
            });

        response
            .expect(200)
            .expect('Content-Type', /json/);
    });
});
