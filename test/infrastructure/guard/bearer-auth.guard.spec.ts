import { BearerAuthGuard } from '../../../src/infrastructure/guard/bearer-auth.guard';

describe('BearerAuthGuard', () => {
    let guard: BearerAuthGuard;
    let applicationModel: any;
    let jwtService: any;
    let context: any;

    const getRequestMock = jest.fn();
    const headerMock = jest.fn();

    beforeAll(() => {
        applicationModel = {
            findOne: jest.fn(),
        };

        jwtService = {
            verify: jest.fn(),
            decode: jest.fn(),
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
        guard = new BearerAuthGuard(applicationModel, jwtService);
    });

    it('canActivate() should return "false" due missing Authorization header', async () => {
        headerMock.mockImplementation(() => false);

        const response = await guard.canActivate(context);

        expect(response).toBeFalsy();
    });

    it('canActivate() should return "false" due missing Authorization data', async () => {
        headerMock.mockImplementation(() => 'Bearer');

        const response = await guard.canActivate(context);

        expect(response).toBeFalsy();
    });

    it('canActivate() should return "false" due wrong Authorization type', async () => {
        headerMock.mockImplementation(() => 'Basic token');

        const response = await guard.canActivate(context);

        expect(response).toBeFalsy();
    });

    it('canActivate() should return "false" due wront jwt on verify method', async () => {
        headerMock.mockImplementation(() => 'Bearer token');
        jwtService.verify.mockImplementation(() => { throw new Error() });

        const response = await guard.canActivate(context);

        expect(response).toBeFalsy();
    });

    it('canActivate() should return "false" due missing application', async () => {
        headerMock.mockImplementation(() => 'Bearer token');
        jwtService.verify.mockImplementation(() => true);
        jwtService.decode.mockImplementation(() => { return { id: 'id' } });
        applicationModel.findOne.mockImplementation(() => null);

        const response = await guard.canActivate(context);

        expect(response).toBeFalsy();
    });

    it('canActivate() should return "true"', async () => {
        headerMock.mockImplementation(() => 'Bearer token');
        jwtService.verify.mockImplementation(() => true);
        jwtService.decode.mockImplementation(() => { return { id: 'id' } });
        applicationModel.findOne.mockImplementation(() => Promise.resolve({}));

        const response = await guard.canActivate(context);

        expect(response).toBeTruthy();
    });
});
