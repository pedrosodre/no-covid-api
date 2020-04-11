import { GetApplicationLimitsMiddleware } from '../../../src/application/middleware/get-application-limits.middleware';

describe('GetApplicationLimitsMiddleware', () => {
    let middleware: GetApplicationLimitsMiddleware;
    let jwtService: any;
    let requestMock: any;
    let responseMock: any;
    let nextMock: any;

    beforeAll(() => {
        jwtService = {
            verify: jest.fn(),
            decode: jest.fn(),
        };

        requestMock = {
            header: jest.fn(),
        };
        nextMock = jest.fn();
    });

    beforeEach(async () => {
        middleware = new GetApplicationLimitsMiddleware(jwtService);
    });

    it('use() should call next() without fill application details for missing Authorization', async () => {
        requestMock.header.mockImplementation(() => null);

        await middleware.use(
            requestMock,
            responseMock,
            nextMock,
        );

        expect(nextMock).toBeCalled();
    });

    it('use() should call next() without fill application details for wrong Authorization type', async () => {
        requestMock.header.mockImplementation(() => 'Basic token');

        await middleware.use(
            requestMock,
            responseMock,
            nextMock,
        );

        expect(nextMock).toBeCalled();
    });

    it('use() should call next() without fill application details for missing Authorization token', async () => {
        requestMock.header.mockImplementation(() => 'Bearer');

        await middleware.use(
            requestMock,
            responseMock,
            nextMock,
        );

        expect(nextMock).toBeCalled();
    });

    it('use() should call next() without fill application details for wrong jwt token', async () => {
        requestMock.header.mockImplementation(() => 'Bearer token');
        jwtService.verify.mockImplementation(() => { throw new Error(); });

        await middleware.use(
            requestMock,
            responseMock,
            nextMock,
        );

        expect(nextMock).toBeCalled();
    });

    it('use() should call next() with application details', async () => {
        requestMock.header.mockImplementation(() => 'Bearer token');
        jwtService.verify.mockImplementation(() => true);
        jwtService.decode.mockImplementation(() => { return { id: 'id', rateLimit: 10, allowedOrigins: [] } });


        await middleware.use(
            requestMock,
            responseMock,
            nextMock,
        );

        expect(requestMock.applicationId).not.toBeUndefined();
        expect(requestMock.applicationRateLimit).not.toBeUndefined();
        expect(requestMock.applicationAllowedOrigins).not.toBeUndefined();
        expect(nextMock).toBeCalled();
    });
});
