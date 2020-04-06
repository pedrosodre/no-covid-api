import { 
    Controller,
    Param,
    Get,
    HttpStatus,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { RoutinesService, RoutineTypes } from '../../domain/service/routines.service';
import { CasesService, CaseTypes } from '../../domain/service/cases.service';
import { CitiesCasesList, CityCases, CityCasesHistory } from './cases.cities';
import { BearerAuthGuard } from '../../infrastructure/guard/bearer-auth.guard';

@ApiTags('Cases')
@Controller('cases/cities')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
export class CasesCitiesController {
    constructor(
        private readonly routinesService: RoutinesService,
        private readonly casesService: CasesService,
    ) {}

    @Get()
    @ApiOkResponse({
        description: 'Recupera a lista de cidades (inicialmente apenas do Brasil) infectadas pela pandemia do COVID-19.',
        type: CitiesCasesList,
    })
    async getCitiesList(): Promise<any> {
        const lastRoutine = await this.routinesService.getLastRoutineByType(RoutineTypes.CITIES);
        const cities = await this.casesService.getCurrentListByRoutine(lastRoutine.id);
 
        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            length: cities.length,
            cities,
        };
    }

    @Get(':city')
    @ApiOkResponse({
        description: 'Recupera o estado atual de uma cidade (inicialmente apenas do Brasil) a respeito da pandemia do COVID-19.',
        type: CityCases,
    })
    @ApiParam({
        name: 'city',
        description: 'Descreve o identificador da cidade, construído através do kebab case do nome da cidade em português.'
    })
    async getCityCases(@Param('city') city): Promise<any> {
        const lastRoutine = await this.routinesService.getLastRoutineByType(RoutineTypes.CITIES);
        const currentCity = await this.casesService.getCurrentCasesByIdAndType(city, CaseTypes.CITY, lastRoutine.id);
 
        if (!currentCity) throw new NotFoundException();

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            city: currentCity,
        };
    }

    @Get(':city/history')
    @ApiOkResponse({
        description: 'Recupera o histórico registrado de um país a respeito da pandemia do COVID-19.',
        type: CityCasesHistory,
    })
    @ApiParam({
        name: 'city',
        description: 'Descreve o identificador da cidade, construído através do kebab case do nome da cidade em português.'
    })
    async getCityCasesHistory(@Param('city') city): Promise<any> {
        const cityHistory = await this.casesService.getCasesHistoryByIdAndType(city, CaseTypes.CITY);
 
        if (cityHistory.length === 0) throw new NotFoundException();

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            history: cityHistory,
        };
    }
}
