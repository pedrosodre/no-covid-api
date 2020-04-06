import { ApplicationController } from '../../../src/application/controller/application.controller';

describe('ApplicationController', () => {
    let applicationController: ApplicationController;
    let applicationService;

    beforeAll(() => {
        applicationService = {
            setApplication: jest.fn()
        };
    });

    beforeEach(async () => {
        applicationController = new ApplicationController(applicationService);
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
