import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../../../src/application/controller/application.controller';
import { ApplicationService } from '../../../src/domain/service/application.service';
import { applicationProviders } from '../../../src/infrastructure/provider/application.provider';
import { JwtService } from '@nestjs/jwt';

describe('ApplicationController', () => {
    let applicationController: ApplicationController;
    let applicationService;

    beforeAll(() => {
        applicationService = {
            setApplication: jest.fn()
        };
    });

    beforeEach(async () => {
        applicationController = new ApplicationController(
            applicationService as any
        );
    });

    it('should return "201 - Created"', async () => {
        const application = {
            id: 'example-app',
            key: 'appKey',
            secret: 'appSecret'
        };
        applicationService.setApplication.mockImplementation(() => application);

        const response = await applicationController.createApplication(
            {
                name: "Example App",
                type: "server-side",
                requestOrigin: [],
                ownerName: "Example Name",
                ownerEmail: "example@example.com",
            },
            {
                ip: '127.0.0.1'
            }
        );

        expect(response.statusCode).toBe(201);
        expect(response.message).toBe('Created');
        expect(response.application).toMatchObject(application);
    });
});
