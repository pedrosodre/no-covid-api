import { 
    Controller,
    Body,
    Request,
    Post,
    Patch,
    HttpStatus,
    UseGuards,
    HttpCode,
} from '@nestjs/common';
import { ApplicationService } from '../../domain/service/application.service';
import {
    ApiTags,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiBasicAuth,
} from '@nestjs/swagger';
import {
    NewApplicationDto,
    RejectJwtDto,
} from '../../domain/dto/application.dto';
import {
    SetApplicationResponse,
    AuthorizeApplicationResponse,
    RejectJwtResponse,
} from './application';
import { BasicAuthGuard } from '../../infrastructure/guard/basic-auth.guard';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) { }

    @Post()
    @ApiCreatedResponse({
        description: 'Realiza a criação de novas credenciais de acesso a API com sucesso.',
        type: SetApplicationResponse,
    })
    async createApplication(@Body() dto: NewApplicationDto, @Request() request): Promise<SetApplicationResponse> {
        const application = await this.applicationService.setApplication(dto, request.ip);
 
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Created',
            application,
        };
    }
    
    @Post('token')
    @UseGuards(BasicAuthGuard)
    @ApiBasicAuth()
    @ApiOkResponse({
        description: 'Realiza a geração de um token JWT para acesso aos demais endpoints da API.',
        type: AuthorizeApplicationResponse,
    })
    @HttpCode(HttpStatus.OK)
    async generateToken(@Request() request): Promise<any> {
        const jwt = this.applicationService.authorize(request.application);
 
        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            application: {
                id: request.application.id,
                jwt,
            },
        };
    }

    @Patch('token/reject')
    @UseGuards(BasicAuthGuard)
    @ApiBasicAuth()
    @ApiOkResponse({
        description: 'Realiza a inclusão de um token JWT na lista de rejeição da sua aplicação.',
        type: RejectJwtResponse,
    })
    async patchJwtToRejectList(@Request() request, @Body() dto: RejectJwtDto): Promise<any> {
        await this.applicationService.rejectToken(request.application.id, dto.jwt);

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
        };
    }
}
