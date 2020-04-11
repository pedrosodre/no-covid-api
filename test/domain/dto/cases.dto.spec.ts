import { Case } from '../../../src/domain/dto/cases.dto';

describe('CasesDto', () => {
    it('Case should create a case object', async () => {
        const caseObj = new Case();

        expect(caseObj).not.toBeUndefined();
    });
});