import { goodNewsProviders } from '../../../src/infrastructure/provider/good-news.provider';

describe('GoodNewsProviders', () => {
    let connection: any;

    beforeAll(() => {
        connection = {
            model: jest.fn(),
        };
    });

    it('goodNewsProviders should call next() for undefined applicationAllowedOrigins', async () => {
        for (const provider of goodNewsProviders) {
            provider.useFactory(connection);

            expect(connection.model).toBeCalled();
        }
    });
});
