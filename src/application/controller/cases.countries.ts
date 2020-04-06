import { ApiProperty } from '@nestjs/swagger';
import { Case } from '../../domain/dto/cases.dto';
import { DefaultResponse } from './response';

export class CountriesCasesList extends DefaultResponse {
    @ApiProperty()
    length: number;

    @ApiProperty({
        type: [Case]
    })
    countries: Case[];
}

export class CountryCases extends DefaultResponse {
    @ApiProperty()
    country: Case;
}

export class CountryCasesHistory extends DefaultResponse {
    @ApiProperty({
        type: [Case]
    })
    history: Case[];
}

