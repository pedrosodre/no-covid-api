import { ApiProperty } from '@nestjs/swagger';
import { CaseTypes } from '../service/cases.service';

export class Case {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    nativeName: string;

    @ApiProperty({
        name: 'type',
        enum: CaseTypes,
        default: '',
    })
    type: string;

    @ApiProperty()
    parent?: string;

    @ApiProperty()
    majorParent?: string;

    @ApiProperty()
    confirmedCases: number;

    @ApiProperty()
    deaths: number;

    @ApiProperty()
    recovered: number;

    @ApiProperty()
    latitude: string;

    @ApiProperty()
    longitude: string;

    @ApiProperty()
    lastUpdated: Date;
}