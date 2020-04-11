import { ApplicationService } from '../../../src/domain/service/application.service';
import { NewApplicationDto } from '../../../src/domain/dto/application.dto';
import { ConflictException } from '@nestjs/common';
import { kebabCase } from 'lodash';

const dto: NewApplicationDto = {
    name: 'Example App',
    type: 'client-side',
    requestOrigin: ['example.com'],
    ownerName: 'Example',
    ownerEmail: 'example@example.com',
};
const ip = '127.0.0.1';

describe('ApplicationService', () => {
    let service: ApplicationService;
    let applicationModel: any;
    let jwtService: any;

    beforeAll(() => {
        applicationModel = {
            findOne: jest.fn(),
            create: jest.fn(),
            updateOne: jest.fn(),
        };

        jwtService = {
            sign: jest.fn(),
        };
    });

    beforeEach(() => {
        service = new ApplicationService(applicationModel, jwtService);
    });

    it('setApplication() should throw ConflictException for existent application name (id)', async () => {
        applicationModel.findOne.mockImplementationOnce(() => dto);
        applicationModel.findOne.mockImplementationOnce(() => null);

        await expect(service.setApplication(dto, ip)).rejects.toThrowError(ConflictException);
    });

    it('setApplication() should throw ConflictException for existent owner e-mail', async () => {
        applicationModel.findOne.mockImplementationOnce(() => null);
        applicationModel.findOne.mockImplementationOnce(() => dto);

        await expect(service.setApplication(dto, ip)).rejects.toThrowError(ConflictException);
    });

    it('setApplication() should create application successfully', async () => {
        applicationModel.findOne.mockImplementationOnce(() => null);
        applicationModel.findOne.mockImplementationOnce(() => null);
        applicationModel.create.mockImplementationOnce(() => Promise.resolve());
        const application = await service.setApplication(dto, ip);

        expect(application).toHaveProperty('id');
        expect(application).toHaveProperty('key');
        expect(application).toHaveProperty('secret');
        expect(applicationModel.create).toBeCalled();
    });

    it('setApplication() should create application successfully for empty requestOrigin', async () => {
        const serverDto = { ...dto };
        delete serverDto.requestOrigin;

        applicationModel.findOne.mockImplementationOnce(() => null);
        applicationModel.findOne.mockImplementationOnce(() => null);
        applicationModel.create.mockImplementationOnce(() => Promise.resolve());
        const application = await service.setApplication(serverDto, ip);

        expect(application).toHaveProperty('id');
        expect(application).toHaveProperty('key');
        expect(application).toHaveProperty('secret');
        expect(applicationModel.create).toBeCalled();
    });

    it('authorize() should return a jwt', async () => {
        await service.authorize({
            id: kebabCase(dto.name),
            name: dto.name,
            rateLimit: 10,
            allowedOrigins: dto.requestOrigin,
        });

        expect(jwtService.sign).toBeCalled();
    });

    it('denyToken() should update application to deny a jwt', async () => {
        await service.denyToken(kebabCase(dto.name), 'token');

        expect(applicationModel.updateOne).toBeCalled();
    });

    it('getRateLimitBasedOnType() should return DEFAULT_FRONTEND_RATE_LIMIT from process.env for client-side type', async () => {
        const type = 'client-side';
        const rateLimit = 10;
        process.env.DEFAULT_FRONTEND_RATE_LIMIT = `${rateLimit}`;

        const limit = service['getRateLimitBasedOnType'](type);

        expect(limit).toBe(rateLimit);
    });

    it('getRateLimitBasedOnType() should return DEFAULT_BACKEND_RATE_LIMIT from process.env for server-side type', async () => {
        const type = 'server-side';
        const rateLimit = 10;
        process.env.DEFAULT_BACKEND_RATE_LIMIT = `${rateLimit}`;

        const limit = service['getRateLimitBasedOnType'](type);

        expect(limit).toBe(rateLimit);
    });

    it('getRateLimitBasedOnType() should return 0 for unknown type', async () => {
        const type = 'unknown';
        const limit = service['getRateLimitBasedOnType'](type);

        expect(limit).toBe(0);
    });
});
