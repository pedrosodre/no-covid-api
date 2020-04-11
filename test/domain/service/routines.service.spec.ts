import { RoutinesService, RoutineTypes } from '../../../src/domain/service/routines.service';

describe('RoutinesService', () => {
    let service: RoutinesService;
    let routinesModel: any;

    const sortMock = jest.fn();
    const selectMock = jest.fn();

    beforeAll(() => {
        routinesModel = {
            findOne: jest.fn(),
        };

        routinesModel.findOne.mockImplementation(() => {
            return {
                sort: sortMock,
            };
        });

        sortMock.mockImplementationOnce(() => {
            return {
                select: selectMock,
            };
        })
    });

    beforeEach(() => {
        service = new RoutinesService(routinesModel);
    });

    it('getLastRoutineByType() should return last routine by type', async () => {
        await service.getLastRoutineByType(RoutineTypes.CITIES);

        expect(routinesModel.findOne).toBeCalled();
        expect(sortMock).toBeCalled();
        expect(selectMock).toBeCalled();
    });
});
