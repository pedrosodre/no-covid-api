import { CasesStatesController } from '../../../src/application/controller/cases.states.controller';

const stateCase = {
    id: 'minas-gerais',
    routineIdentifier: 'states-4b53b727-03dd-479d-9a94-c5a35add811a',
    name: 'Minas Gerais',
    type: 'state',
    parent: 'brazil',
    majorParent: null,
    confirmedCases: 498,
    deaths: 6,
    recovered: null,
    latitude: '-18.1',
    longitude: '-44.38',
    created: 1586110841930,
    lastUpdated: 1586110841930
};

describe('CasesStatesController', () => {
    let casesStatesController: CasesStatesController;
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
        casesStatesController = new CasesStatesController(routinesService, casesService);
    });

    it('getStatesList() should return "200 - OK"', async () => {
        routinesService.getLastRoutineByType.mockImplementation(() => {
            return { id: stateCase.routineIdentifier }
        });
        casesService.getCurrentListByRoutine.mockImplementation(() => [stateCase]);

        const response = await casesStatesController.getStatesList();

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.length).toBe(1);
        expect(response.states[0]).toMatchObject(stateCase);
    });

    it('getStateCases() should return "200 - OK"', async () => {
        routinesService.getLastRoutineByType.mockImplementation(() => {
            return { id: stateCase.routineIdentifier }
        });
        casesService.getCurrentCasesByIdAndType.mockImplementation(() => stateCase);

        const response = await casesStatesController.getStateCases(stateCase.id);

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.state).toMatchObject(stateCase);
    });

    it('getStateCases() should return "404 - Not Found"', async () => {
        routinesService.getLastRoutineByType.mockImplementation(() => {
            return { id: stateCase.routineIdentifier }
        });
        casesService.getCurrentCasesByIdAndType.mockImplementation(() => null);

        await expect(casesStatesController.getStateCases(stateCase.id));
    });

    it('getStateCasesHistory() should return "200 - OK"', async () => {
        casesService.getCasesHistoryByIdAndType.mockImplementation(() => [stateCase]);

        const response = await casesStatesController.getStateCasesHistory(stateCase.id);

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.history[0]).toMatchObject(stateCase);
    });

    it('getStateCasesHistory() should return "404 - Not Found"', async () => {
        casesService.getCasesHistoryByIdAndType.mockImplementation(() => []);

        await expect(casesStatesController.getStateCasesHistory(stateCase.id));
    });
});
