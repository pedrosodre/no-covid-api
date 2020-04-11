import { applicationProviders } from '../../../src/infrastructure/provider/application.provider';

describe('ApplicationProviders', () => {
    let connection: any;

    beforeAll(() => {
        connection = {
            model: jest.fn(),
        };
    });

    it('applicationProviders should call next() for undefined applicationAllowedOrigins', async () => {
        for (const provider of applicationProviders) {
            provider.useFactory(connection);

            expect(connection.model).toBeCalled();
        }
    });
});
