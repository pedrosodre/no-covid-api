import { NewsController } from '../../../src/application/controller/news.controller';

const singleNews = {
        id: 'por-que-as-criancas-sao-afetadas-de-maneira-diferente-pelo-coronavirus-bbc-news-brasil',
        country: 'Brasil',
        countryCode: 'BR',
        routineIdentifier: 'news-40fe88d0-82ac-4e2f-82fd-50e33c84edb9',
        source: 'Bbc.com',
        author: 'https://www.facebook.com/bbcnews',
        title: 'Por que as crianças são afetadas de maneira diferente pelo coronavírus, BBC News Brasil',
        description: 'Elas não estão imunes à covid-19, mas parecem menos vulneráveis porque o vírus tem atingido mais suas vias aéreas superiores, em vez do pulmão; mas há registros de casos fatais',
        url: 'https://www.bbc.com/portuguese/geral-52152324',
        image: 'https://ichef.bbci.co.uk/news/1024/branded_portuguese/72A2/production/_111564392_getty-crianca.jpg',
        publishedAt: 1586094066000,
        createdAt: 1586110870676,
        updatedAt: 1586110870676
};

const singleGoodNews = {
    id: 'yahoo-noticias-sobreviventes-doam-plasma-para-tentar-salvar-outras-pessoas',
    country: 'Brasil',
    countryCode: 'BR',
    routineIdentifier: 'good-news-32d7a73c-bba4-471a-8791-40e57f078c17',
    source: 'Yahoo Notícias',
    author: '',
    title: 'Sobreviventes doam plasma para tentar salvar outras pessoas',
    description: '',
    url: 'https://br.financas.yahoo.com/noticias/coronav%c3%adrus-sobreviventes-doam-plasma-para-140000928.html',
    image: 'https://s.yimg.com/ny/api/res/1.2/ooDd.t2DzwMBC7UTk0O4Ug--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/https://media.zenfs.com/pt-br/canal_tech_990/d3fd5deb05063ee85a2a02f0a2843769',
    publishedAt: 1586055600000,
    createdAt: 1586110884774,
    updatedAt: 1586110884774
};

describe('NewsController', () => {
    let newsController: NewsController;
    let newsService: any;

    beforeAll(() => {
        newsService = {
            getNewsByCountryCode: jest.fn(),
            getGoodNewsByCountryCode: jest.fn(),
        };
    });

    beforeEach(async () => {
        newsController = new NewsController(newsService);
    });

    it('getNews() should return "200 - OK"', async () => {
        newsService.getNewsByCountryCode.mockImplementation(() => [singleNews]);

        const response = await newsController.getNews('BR');

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.length).toBe(1);
        expect(response.news[0]).toMatchObject(singleNews);
    });

    it('getGoodNews() should return "200 - OK"', async () => {
        newsService.getGoodNewsByCountryCode.mockImplementation(() => [singleGoodNews]);

        const response = await newsController.getGoodNews('BR');

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.length).toBe(1);
        expect(response.news[0]).toMatchObject(singleGoodNews);
    });

    it('getNewsWithLimit() should return "200 - OK"', async () => {
        newsService.getNewsByCountryCode.mockImplementation(() => [singleNews]);

        const response = await newsController.getNewsWithLimit('BR', '1');

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.length).toBe(1);
        expect(response.news[0]).toMatchObject(singleNews);
    });

    it('getGoodNewsWithLimit() should return "200 - OK"', async () => {
        newsService.getGoodNewsByCountryCode.mockImplementation(() => [singleGoodNews]);

        const response = await newsController.getGoodNewsWithLimit('BR', '1');

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('OK');
        expect(response.length).toBe(1);
        expect(response.news[0]).toMatchObject(singleGoodNews);
    });
});
