import { CasesTotalController } from '../../../src/application/controller/cases.total.controller';

const total = {
    confirmedCases: 1000,
    deaths: 100,
    recovered: 200,
};

describe('CasesTotalController', () => {
    let casesTotalController: CasesTotalController;
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
        casesTotalController = new CasesTotalController(routinesService, casesService);
    });

    it('getTotalCases() should return "200 - OK"', async () => {
        routinesService.getLastRoutineByType.mockImplementation((type: string) => {
            return { id: `${type}-ee2ab033-873c-4b83-881e-86e518c02a45` }
        });
        casesService.getTotalWorldCases.mockImplementation(() => [total]);

        const response = await casesTotalController.getTotalCases();

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
    });
});
