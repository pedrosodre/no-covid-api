import { newsProviders } from '../../../src/infrastructure/provider/news.provider';

describe('newsProviders', () => {
    let connection: any;

    beforeAll(() => {
        connection = {
            model: jest.fn(),
        };
    });

    it('newsProviders should call next() for undefined applicationAllowedOrigins', async () => {
        for (const provider of newsProviders) {
            provider.useFactory(connection);

            expect(connection.model).toBeCalled();
        }
    });
});
