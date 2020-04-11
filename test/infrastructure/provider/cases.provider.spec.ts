import { casesProviders } from '../../../src/infrastructure/provider/cases.provider';

describe('CasesProviders', () => {
    let connection: any;

    beforeAll(() => {
        connection = {
            model: jest.fn(),
        };
    });

    it('casesProviders should call next() for undefined applicationAllowedOrigins', async () => {
        for (const provider of casesProviders) {
            provider.useFactory(connection);

            expect(connection.model).toBeCalled();
        }
    });
});
