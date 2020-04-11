import { ApplicationController } from '../../../src/application/controller/application.controller';

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGVkcm8gU29kcsOpIiwibWVzc2FnZSI6Ik9sw6EsIGN1cmlvc28gOikiLCJpYXQiOjE1MTYyMzkwMjJ9.JfuytMqdMxo35jsjwxSv3L99dxWqz_vf3HEe-gKCmIA';
describe('ApplicationController', () => {
    let applicationController: ApplicationController;
    let applicationService;

    beforeAll(() => {
        applicationService = {
            setApplication: jest.fn(),
            authorize: jest.fn(),
            rejectToken: jest.fn(),
        };
    });

    beforeEach(async () => {
        applicationController = new ApplicationController(applicationService);
    });

    it('createApplication() should return "201 - Created"', async () => {
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

    it('generateToken() should return "200 - OK"', async () => {
        applicationService.authorize.mockImplementation(() => jwt);

        const response = await applicationController.generateToken(
            {
                application: { id: 'example-app' }
            }
        );

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.application.jwt).toBe(jwt);
    });

    it('patchJwtToRejectList() should return "200 - OK"', async () => {
        applicationService.rejectToken.mockImplementation();

        const response = await applicationController.patchJwtToRejectList(
            {
                application: { id: 'example-app' }
            },
            { jwt }
        );

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
    });
});
