import { ApiProperty } from '@nestjs/swagger';
import { Case } from '../../domain/dto/cases.dto';
import { DefaultResponse } from './response';

export class CitiesCasesList extends DefaultResponse {
    @ApiProperty()
    length: number;

    @ApiProperty({
        type: [Case]
    })
    cities: Case[];
}

export class CityCases extends DefaultResponse {
    @ApiProperty()
    city: Case;
}

export class CityCasesHistory extends DefaultResponse {
    @ApiProperty({
        type: [Case]
    })
    history: Case[];
}

