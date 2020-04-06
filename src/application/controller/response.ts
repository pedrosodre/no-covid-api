import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponse {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;
}