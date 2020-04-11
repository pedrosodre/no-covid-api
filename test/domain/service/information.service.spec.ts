import { InformationService } from '../../../src/domain/service/information.service';

describe('InformationService', () => {
    let service: InformationService;
    let routinesModel: any;

    const groupMock = jest.fn();

    beforeAll(() => {
        routinesModel = {
            aggregate: jest.fn(),
        };

        routinesModel.aggregate.mockImplementation(() => {
            return {
                group: groupMock
            };
        });
    });

    beforeEach(() => {
        service = new InformationService(routinesModel);
    });

    it('getLastRoutines() should return last routines type and date', async () => {
        groupMock.mockImplementation(() => {
            return [{
                _id: 'id',
                date: 'date',
            }];
        });
        const routines = await service.getLastRoutines();

        expect(routines.length).toBe(1);
        expect(routines[0]).toHaveProperty('type');
        expect(routines[0]).toHaveProperty('date');
        expect(routinesModel.aggregate).toBeCalled();
        expect(groupMock).toBeCalled();
    });
});
