import { CasesService } from '../../../src/domain/service/cases.service';

describe('CasesService', () => {
    let service: CasesService;
    let casesModel: any;

    const sortMock = jest.fn();
    const selectMock = jest.fn();
    const matchMock = jest.fn();
    const groupMock = jest.fn();
    const projectMock = jest.fn();

    beforeAll(() => {
        casesModel = {
            find: jest.fn(),
            findOne: jest.fn(),
            aggregate: jest.fn(),
        };

        casesModel.find.mockImplementation(() => {
            return {
                sort: sortMock,
                select: selectMock,
            };
        });

        casesModel.findOne.mockImplementation(() => {
            return {
                sort: sortMock,
                select: selectMock,
            };
        });

        sortMock.mockImplementation(() => {
            return {
                select: selectMock
            };
        });

        casesModel.aggregate.mockImplementation(() => {
            return {
                match: matchMock
            };
        });

        matchMock.mockImplementation(() => {
            return {
                group: groupMock
            };
        });

        groupMock.mockImplementation(() => {
            return {
                project: projectMock
            };
        });
    });

    beforeEach(() => {
        service = new CasesService(casesModel);
    });

    it('getCurrentListByRoutine() should return current list by routine', async () => {
        await service.getCurrentListByRoutine('routineId');

        expect(casesModel.find).toBeCalled();
        expect(sortMock).toBeCalled();
        expect(selectMock).toBeCalled();
    });

    it('getCurrentCasesByIdAndType() should return current cases by id, type and routine', async () => {
        await service.getCurrentCasesByIdAndType('id', 'type', 'routineId');

        expect(casesModel.findOne).toBeCalled();
        expect(selectMock).toBeCalled();
    });

    it('getCasesHistoryByIdAndType() should return cases history by id and type', async () => {
        await service.getCasesHistoryByIdAndType('id', 'type');

        expect(casesModel.find).toBeCalled();
        expect(sortMock).toBeCalled();
        expect(selectMock).toBeCalled();
    });

    it('getTotalWorldCases() should return total world cases', async () => {
        await service.getTotalWorldCases('routine');

        expect(casesModel.aggregate).toBeCalled();
        expect(matchMock).toBeCalled();
        expect(groupMock).toBeCalled();
        expect(projectMock).toBeCalled();
    });
});
