import { CasesCountriesController } from '../../../src/application/controller/cases.countries.controller';
import { NotFoundException } from '@nestjs/common';

const countryCase = {
    id: 'brazil',
    routineIdentifier: 'countries-068c6cb0-399e-40d9-a9fc-726685f0a6b6',
    name: 'Brazil',
    nativeName: 'Brasil',
    type: 'country',
    parent: null,
    majorParent: null,
    confirmedCases: 10361,
    deaths: 445,
    recovered: 127,
    latitude: '-14.235004',
    longitude: '-51.92528',
    created: 1586110852726,
    lastUpdated: 1586110852726
};

describe('CasesCountriesController', () => {
    let casesCountriesController: CasesCountriesController;
    let routinesService: any;
    let casesService: any;

    beforeAll(() => {
        routinesService = {
            getLastRoutineByType: jest.fn(),
        };

        casesService = {
            getCurrentListByRoutine: jest.fn(),
            getCurrentCasesByIdAndType: jest.fn(),
            getCasesHistoryByIdAndType: jest.fn(),
            getTotalWorldCases: jest.fn(),
        };
    });

    beforeEach(async () => {
        casesCountriesController = new CasesCountriesController(routinesService, casesService);
    });

    it('getCountriesCases() should return "200 - OK"', async () => {
        routinesService.getLastRoutineByType.mockImplementation(() => {
            return { id: countryCase.routineIdentifier }
        });
        casesService.getCurrentListByRoutine.mockImplementation(() => [countryCase]);

        const response = await casesCountriesController.getCountriesCases();

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.length).toBe(1);
        expect(response.countries[0]).toMatchObject(countryCase);
    });

    it('getSingleCountryCases() should return "200 - OK"', async () => {
        routinesService.getLastRoutineByType.mockImplementation(() => {
            return { id: countryCase.routineIdentifier }
        });
        casesService.getCurrentCasesByIdAndType.mockImplementation(() => countryCase);

        const response = await casesCountriesController.getSingleCountryCases(countryCase.id);

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.country).toMatchObject(countryCase);
    });

    it('getSingleCountryCases() should return "404 - Not Found"', async () => {
        routinesService.getLastRoutineByType.mockImplementation(() => {
            return { id: countryCase.routineIdentifier }
        });
        casesService.getCurrentCasesByIdAndType.mockImplementation(() => null);

        await expect(casesCountriesController.getSingleCountryCases(countryCase.id)).rejects.toThrowError(NotFoundException);
    });

    it('getCountryCasesHistory() should return "200 - OK"', async () => {
        casesService.getCasesHistoryByIdAndType.mockImplementation(() => [countryCase]);

        const response = await casesCountriesController.getCountryCasesHistory(countryCase.id);

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.history[0]).toMatchObject(countryCase);
    });

    it('getCountryCasesHistory() should return "404 - Not Found"', async () => {
        casesService.getCasesHistoryByIdAndType.mockImplementation(() => []);

        await expect(casesCountriesController.getCountryCasesHistory(countryCase.id)).rejects.toThrowError(NotFoundException);
    });
});
