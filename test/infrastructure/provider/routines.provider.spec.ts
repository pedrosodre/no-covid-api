import { routinesProviders } from '../../../src/infrastructure/provider/routines.provider';

describe('RoutinesProviders', () => {
    let connection: any;

    beforeAll(() => {
        connection = {
            model: jest.fn(),
        };
    });

    it('routinesProviders should call next() for undefined applicationAllowedOrigins', async () => {
        for (const provider of routinesProviders) {
            provider.useFactory(connection);

            expect(connection.model).toBeCalled();
        }
    });
});
