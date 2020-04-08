import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from './response';

export class TotalCases {
    @ApiProperty()
    confirmedCases: number;

    @ApiProperty()
    deaths: number;

    @ApiProperty()
    recovered: number;

    @ApiProperty()
    lethality: number;

    @ApiProperty()
    mortalityRate: number;

    @ApiProperty()
    recoveryRate: number;
}

export class TotalCasesStats extends DefaultResponse {
    @ApiProperty({
        type: [TotalCases]
    })
    cases: TotalCases[];
}