import { Routine } from '../../../src/domain/dto/routines.dto';

describe('RoutineDto', () => {
    it('Routine should create a routine object', async () => {
        const routine = new Routine();

        expect(routine).not.toBeUndefined();
    })
});