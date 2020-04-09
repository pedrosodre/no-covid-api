import { CasesCitiesController } from '../../../src/application/controller/cases.cities.controller';
import { NotFoundException } from '@nestjs/common';

const cityCase = {
    id: 'belo-horizonte',
    routineIdentifier: 'cities-ee2ab033-873c-4b83-881e-86e518c02a45',
    name: 'Belo Horizonte',
    type: 'city',
    parent: 'minas-gerais',
    majorParent: 'brazil',
    confirmedCases: 237,
    deaths: 3,
    recovered: null,
    latitude: '-19.9227318',
    longitude: '-43.9450948',
    created: 1586110816049,
    lastUpdated: 1586110816049
};

describe('CasesCitiesController', () => {
    let casesCitiesController: CasesCitiesController;
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
        casesCitiesController = new CasesCitiesController(routinesService, casesService);
    });

    it('getCitiesList() should return "200 - OK"', async () => {
        routinesService.getLastRoutineByType.mockImplementation(() => {
            return { id: cityCase.routineIdentifier }
        });
        casesService.getCurrentListByRoutine.mockImplementation(() => [cityCase]);

        const response = await casesCitiesController.getCitiesList();

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.length).toBe(1);
        expect(response.cities[0]).toMatchObject(cityCase);
    });

    it('getCityCases() should return "200 - OK"', async () => {
        routinesService.getLastRoutineByType.mockImplementation(() => {
            return { id: cityCase.routineIdentifier }
        });
        casesService.getCurrentCasesByIdAndType.mockImplementation(() => cityCase);

        const response = await casesCitiesController.getCityCases(cityCase.id);

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.city).toMatchObject(cityCase);
    });

    it('getCityCases() should return "404 - Not Found"', async () => {
        routinesService.getLastRoutineByType.mockImplementation(() => {
            return { id: cityCase.routineIdentifier }
        });
        casesService.getCurrentCasesByIdAndType.mockImplementation(() => null);

        await expect(casesCitiesController.getCityCases(cityCase.id)).rejects.toThrowError(NotFoundException);
    });

    it('getCityCasesHistory() should return "200 - OK"', async () => {
        casesService.getCasesHistoryByIdAndType.mockImplementation(() => [cityCase]);

        const response = await casesCitiesController.getCityCasesHistory(cityCase.id);

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.history.length).toBe(1);
        expect(response.history[0]).toMatchObject(cityCase);
    });

    it('getCityCasesHistory() should return "404 - Not Found"', async () => {
        casesService.getCasesHistoryByIdAndType.mockImplementation(() => []);

        await expect(casesCitiesController.getCityCasesHistory(cityCase.id)).rejects.toThrowError(NotFoundException);
    });
});
