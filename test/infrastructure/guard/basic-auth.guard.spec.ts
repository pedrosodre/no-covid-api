import { BasicAuthGuard } from '../../../src/infrastructure/guard/basic-auth.guard';

describe('BasicAuthGuard', () => {
    let guard: BasicAuthGuard;
    let applicationModel: any;
    let context: any;

    const getRequestMock = jest.fn();
    const headerMock = jest.fn();

    beforeAll(() => {
        applicationModel = {
            findOne: jest.fn(),
        };

        context = {
            switchToHttp: jest.fn(),
        };

        context.switchToHttp.mockImplementation(() => {
            return {
                getRequest: getRequestMock
            };
        });

        getRequestMock.mockImplementation(() => {
            return {
                header: headerMock
            }
        });
    });

    beforeEach(async () => {
        guard = new BasicAuthGuard(applicationModel);
    });

    it('canActivate() should return "false" due missing Authorization header', async () => {
        headerMock.mockImplementation(() => false);

        const response = await guard.canActivate(context);

        expect(response).toBeFalsy();
    });

    it('canActivate() should return "false" due missing Authorization data', async () => {
        headerMock.mockImplementation(() => 'Basic');

        const response = await guard.canActivate(context);

        expect(response).toBeFalsy();
    });

    it('canActivate() should return "false" due wrong Authorization type', async () => {
        headerMock.mockImplementation(() => 'Bearer token');

        const response = await guard.canActivate(context);

        expect(response).toBeFalsy();
    });

    it('canActivate() should return "false" due wrong Authorization data', async () => {
        headerMock.mockImplementation(() => 'Basic token');

        const response = await guard.canActivate(context);

        expect(response).toBeFalsy();
    });

    it('canActivate() should return "false" due missing application', async () => {
        headerMock.mockImplementation(() => 'Basic a2V5OnNlY3JldA==');
        applicationModel.findOne.mockImplementation(() => null);

        const response = await guard.canActivate(context);

        expect(response).toBeFalsy();
    });

    it('canActivate() should return "true"', async () => {
        headerMock.mockImplementation(() => 'Basic a2V5OnNlY3JldA==');
        applicationModel.findOne.mockImplementation(() => Promise.resolve({}));

        const response = await guard.canActivate(context);

        expect(response).toBeTruthy();
    });
});
