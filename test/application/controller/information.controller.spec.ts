import { InformationController } from '../../../src/application/controller/information.controller';

describe('InformationController', () => {
    let informationController: InformationController;
    let informationService;

    beforeAll(() => {
        process.env.SOURCES = 'Wikipedia|https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic';

        informationService = {
            getLastRoutines: jest.fn(),
        };
    });

    beforeEach(async () => {
        informationController = new InformationController(informationService);
    });
    
    it('getSources() should return "200 - OK"', async () => {
        const response = await informationController.getSources();

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.sources.length).toBe(1);
    });

    it('getRoutinesInfo() should return "200 - OK"', async () => {
        informationService.getLastRoutines.mockImplementation(() => []);

        const response = await informationController.getRoutinesInfo();

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.lastUpdate.length).toBe(0);
    });
});
