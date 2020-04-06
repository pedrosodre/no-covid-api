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
import { StateCases, StateCasesHistory, StatesCasesList } from './cases.states';
import { BearerAuthGuard } from '../../infrastructure/guard/bearer-auth.guard';

@ApiTags('Cases')
@Controller('cases/states')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
export class CasesStatesController {
    constructor(
        private readonly routinesService: RoutinesService,
        private readonly casesService: CasesService,
    ) {}

    @Get()
    @ApiOkResponse({
        description: 'Recupera a lista de estados (inicialmente apenas do Brasil) infectados pela pandemia do COVID-19.',
        type: StatesCasesList,
    })
    async getStatesList(): Promise<any> {
        const lastRoutine = await this.routinesService.getLastRoutineByType(RoutineTypes.STATES);
        const states = await this.casesService.getCurrentListByRoutine(lastRoutine.id);
 
        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            length: states.length,
            states,
        };
    }

    @Get(':state')
    @ApiOkResponse({
        description: 'Recupera a situação atual de um estado (inicialmente apenas do Brasil) a respeito da pandemia do COVID-19.',
        type: StateCases,
    })
    @ApiParam({
        name: 'state',
        description: 'Descreve o identificador do estado, construído através do kebab case do nome do estado em português.'
    })
    async getStateCases(@Param('state') state): Promise<any> {
        const lastRoutine = await this.routinesService.getLastRoutineByType(RoutineTypes.STATES);
        const currentState = await this.casesService.getCurrentCasesByIdAndType(state, CaseTypes.STATE, lastRoutine.id);
 
        if (!currentState) throw new NotFoundException();

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            state: currentState,
        };
    }

    @Get(':state/history')
    @ApiOkResponse({
        description: 'Recupera o histórico registrado de um estado (inicialmente apenas do Brasil) a respeito da pandemia do COVID-19.',
        type: StateCasesHistory,
    })
    @ApiParam({
        name: 'state',
        description: 'Descreve o identificador do estado, construído através do kebab case do nome do estado em português.'
    })
    async getStateCasesHistory(@Param('state') state): Promise<any> {
        const stateHistory = await this.casesService.getCasesHistoryByIdAndType(state, CaseTypes.STATE);
 
        if (stateHistory.length === 0) throw new NotFoundException();

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            history: stateHistory,
        };
    }
}
