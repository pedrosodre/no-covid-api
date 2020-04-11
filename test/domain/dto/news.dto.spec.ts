import { News } from '../../../src/domain/dto/news.dto';

describe('NewsDto', () => {
    it('News should create a news object', async () => {
        const news = new News();

        expect(news).not.toBeUndefined();
    })
});