import { NewApplicationDto } from '../../../src/domain/dto/application.dto';

describe('ApplicationDto', () => {
    it('NewApplicationDto should create an application object', async () => {
        const app = new NewApplicationDto();

        expect(app).not.toBeUndefined();
    })
});