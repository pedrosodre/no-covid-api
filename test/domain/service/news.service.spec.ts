import { NewsService } from '../../../src/domain/service/news.service';

describe('NewsService', () => {
    let service: NewsService;
    let newsModel: any;
    let goodNewsModel: any;

    const sortMock = jest.fn();
    const limitMock = jest.fn();
    const selectMock = jest.fn();

    beforeAll(() => {
        process.env.DEFAULT_AMOUNT_RESULTS = '10';

        newsModel = {
            find: jest.fn(),
        };

        goodNewsModel = {
            find: jest.fn(),
        };

        newsModel.find.mockImplementation(() => {
            return {
                sort: sortMock
            };
        });

        goodNewsModel.find.mockImplementation(() => {
            return {
                sort: sortMock
            };
        });

        sortMock.mockImplementation(() => {
            return {
                limit: limitMock
            };
        });

        limitMock.mockImplementation(() => {
            return {
                select: selectMock
            };
        });
    });

    beforeEach(() => {
        service = new NewsService(newsModel, goodNewsModel);
    });

    it('getNewsByCountryCode() should return news by country code with default amount', async () => {
        await service.getNewsByCountryCode('BR');

        expect(newsModel.find).toBeCalled();
        expect(sortMock).toBeCalled();
        expect(limitMock).toBeCalled();
        expect(selectMock).toBeCalled();
    });

    it('getNewsByCountryCode() should return news by country code', async () => {
        await service.getNewsByCountryCode('BR', 10);

        expect(newsModel.find).toBeCalled();
        expect(sortMock).toBeCalled();
        expect(limitMock).toBeCalled();
        expect(selectMock).toBeCalled();
    });

    it('getGoodNewsByCountryCode() should return good news by country code with default amount', async () => {
        await service.getGoodNewsByCountryCode('BR');

        expect(goodNewsModel.find).toBeCalled();
        expect(sortMock).toBeCalled();
        expect(limitMock).toBeCalled();
        expect(selectMock).toBeCalled();
    });

    it('getGoodNewsByCountryCode() should return good news by country code', async () => {
        await service.getGoodNewsByCountryCode('BR', 10);

        expect(goodNewsModel.find).toBeCalled();
        expect(sortMock).toBeCalled();
        expect(limitMock).toBeCalled();
        expect(selectMock).toBeCalled();
    });
});
