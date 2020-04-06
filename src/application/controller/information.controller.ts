import { 
    Controller,
    Get,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOkResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { InformationService } from '../../domain/service/information.service';

@ApiTags('Information')
@Controller('information')
@ApiBearerAuth()
export class InformationController {
    constructor(private readonly informationService: InformationService) { }

    @Get('sources')
    @ApiOkResponse({
        description: 'Retorna a lista de fontes de informações utilizada pela API.',
    })
    async getSources(): Promise<any> {
        const sources: any[] = process.env.SOURCES.split(',');
 
        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            sources: sources.map((source) => {
                const sourceDetails = source.split('|');
                return {
                    name: sourceDetails?.[0],
                    url: sourceDetails?.[1],
                };
            }),
        };
    }
    
    @Get('routines')
    @ApiOkResponse({
        description: 'Retorna dados sobre as sincronizações dos dados utilizados pela API.',
    })
    async getRoutinesInfo(): Promise<any> {
        const lastUpdate = await this.informationService.getLastRoutines();

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            lastUpdate,
        };
    }
}
