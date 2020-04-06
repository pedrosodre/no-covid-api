import { ApiProperty } from '@nestjs/swagger';
import { Case } from '../../domain/dto/cases.dto';
import { DefaultResponse } from './response';

export class StatesCasesList extends DefaultResponse {
    @ApiProperty()
    length: number;

    @ApiProperty({
        type: [Case]
    })
    states: Case[];
}

export class StateCases extends DefaultResponse {
    @ApiProperty()
    state: Case;
}

export class StateCasesHistory extends DefaultResponse {
    @ApiProperty({
        type: [Case]
    })
    history: Case[];
}

