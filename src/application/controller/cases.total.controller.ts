import { 
    Controller,
    Get,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RoutinesService, RoutineTypes } from '../../domain/service/routines.service';
import { CasesService } from '../../domain/service/cases.service';
import { TotalCasesStats } from './cases.total';
import { BearerAuthGuard } from '../../infrastructure/guard/bearer-auth.guard';

@ApiTags('Cases')
@Controller('cases/total')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
export class CasesTotalController {
    constructor(
        private readonly routinesService: RoutinesService,
        private readonly casesService: CasesService,
    ) {}

    @Get()
    @ApiOkResponse({
        description: 'Recupera o total de casos da pandemia do COVID-19 no mundo.',
        type: TotalCasesStats,
    })
    async getTotalCases(): Promise<any> {
        const lastRoutine = await this.routinesService.getLastRoutineByType(RoutineTypes.COUNTRIES);
        const total = await this.casesService.getTotalWorldCases(lastRoutine.id);
 
        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            cases: {
                confirmedCases: total[0].confirmedCases,
                deaths: total[0].deaths,
                recovered: total[0].recovered,
                mortalityRate: Number(( total[0].deaths / total[0].confirmedCases ).toFixed(3)),
                recoveryRate: Number(( total[0].recovered / total[0].confirmedCases ).toFixed(3)),
            }
        };
    }
}
