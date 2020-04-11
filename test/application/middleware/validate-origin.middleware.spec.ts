import { ValidateOriginMiddleware } from '../../../src/application/middleware/validate-origin.middleware';

describe('GetApplicationLimitsMiddleware', () => {
    let middleware: ValidateOriginMiddleware;
    let requestMock: any;
    let responseMock: any;
    let nextMock: any;

    beforeAll(() => {
        requestMock = {
            header: jest.fn(),
        };
        responseMock = {
            setHeader: jest.fn(),
        }
        nextMock = jest.fn();
    });

    beforeEach(async () => {
        middleware = new ValidateOriginMiddleware();
    });

    it('use() should call next() for undefined applicationAllowedOrigins', async () => {
        await middleware.use(
            requestMock,
            responseMock,
            nextMock,
        );

        expect(nextMock).toBeCalled();
    });

    it('use() should call next() for empty applicationAllowedOrigins', async () => {
        requestMock.applicationAllowedOrigins = [];

        await middleware.use(
            requestMock,
            responseMock,
            nextMock,
        );

        expect(nextMock).toBeCalled();
    });

    it('use() should call next() and set CORS for empty origin', async () => {
        requestMock.header.mockImplementation(() => null);
        requestMock.applicationAllowedOrigins = ['example.com'];

        await middleware.use(
            requestMock,
            responseMock,
            nextMock,
        );

        expect(responseMock.setHeader).toBeCalled();
        expect(nextMock).toBeCalled();
    });

    it('use() should call next() and set CORS for wrong origin', async () => {
        requestMock.header.mockImplementation(() => 'domain.com');
        requestMock.applicationAllowedOrigins = ['example.com'];

        await middleware.use(
            requestMock,
            responseMock,
            nextMock,
        );

        expect(responseMock.setHeader).toBeCalled();
        expect(nextMock).toBeCalled();
    });

    it('use() should call next() and set CORS for correct origin', async () => {
        requestMock.header.mockImplementation(() => 'https://example.com');
        requestMock.applicationAllowedOrigins = ['example.com'];

        await middleware.use(
            requestMock,
            responseMock,
            nextMock,
        );

        expect(responseMock.setHeader).toBeCalled();
        expect(nextMock).toBeCalled();
    });
});
