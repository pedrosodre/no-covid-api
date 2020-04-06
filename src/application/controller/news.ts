import { ApiProperty } from '@nestjs/swagger';
import { News } from '../../domain/dto/news.dto';
import { DefaultResponse } from './response';

export class NewsList extends DefaultResponse {
    @ApiProperty()
    length: number;

    @ApiProperty({
        type: [News]
    })
    news: News[];
}
