import { ApiProperty } from '@nestjs/swagger';

export class News {
    @ApiProperty()
    id: string;
    
    @ApiProperty()
    country: string;

    @ApiProperty()
    countryCode: string;

    @ApiProperty()
    source: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    publishedAt: Date;
}