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
import { CountriesCasesList, CountryCases, CountryCasesHistory } from './cases.countries';
import { BearerAuthGuard } from '../../infrastructure/guard/bearer-auth.guard';

@ApiTags('Cases')
@Controller('cases/countries')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
export class CasesCountriesController {
    constructor(
        private readonly routinesService: RoutinesService,
        private readonly casesService: CasesService,
    ) {}

    @Get()
    @ApiOkResponse({
        description: 'Recupera a lista de países infectados pela pandemia do COVID-19, juntamente com os dados dos casos atuais.',
        type: CountriesCasesList,
    })
    async getCountriesCases(): Promise<any> {
        const lastRoutine = await this.routinesService.getLastRoutineByType(RoutineTypes.COUNTRIES);
        const countries = await this.casesService.getCurrentListByRoutine(lastRoutine.id);
 
        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            length: countries.length,
            countries,
        };
    }

    @Get(':country')
    @ApiOkResponse({
        description: 'Recupera o estado atual de um país a respeito da pandemia do COVID-19.',
        type: CountryCases,
    })
    @ApiParam({
        name: 'country',
        description: 'Descreve o identificador do país, construído através do kebab case do nome do país em inglês.'
    })
    async getSingleCountryCases(@Param('country') country): Promise<any> {
        const lastRoutine = await this.routinesService.getLastRoutineByType(RoutineTypes.COUNTRIES);
        const currentCountry = await this.casesService.getCurrentCasesByIdAndType(country, CaseTypes.COUNTRY, lastRoutine.id);
 
        if (!currentCountry) throw new NotFoundException();

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            country: currentCountry,
        };
    }

    @Get(':country/history')
    @ApiOkResponse({
        description: 'Recupera o histórico registrado de um país desde o início do funcionamento da API a respeito da pandemia do COVID-19.',
        type: CountryCasesHistory,
    })
    @ApiParam({
        name: 'country',
        description: 'Descreve o identificador do país, construído através do kebab case do nome do país em inglês.'
    })
    async getCountryCasesHistory(@Param('country') country): Promise<any> {
        const countryHistory = await this.casesService.getCasesHistoryByIdAndType(country, CaseTypes.COUNTRY);
 
        if (countryHistory.length === 0) throw new NotFoundException();

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            history: countryHistory,
        };
    }
}
