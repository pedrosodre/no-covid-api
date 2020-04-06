import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from './response';

export class ApplicationDetails {
    @ApiProperty()
    id: string;
    
    @ApiProperty()
    key: string;
    
    @ApiProperty()
    secret: string;
}

export class SetApplicationResponse extends DefaultResponse {
    @ApiProperty({
        type: ApplicationDetails
    })
    application: ApplicationDetails;
}

export class ApplicationAuthDetails {
    @ApiProperty()
    id: string;

    @ApiProperty()
    jwt: string;
}

export class AuthorizeApplicationResponse extends DefaultResponse {
    @ApiProperty({
        type: ApplicationAuthDetails
    })
    application: ApplicationAuthDetails;

}

export class BlacklistJwtResponse extends DefaultResponse {};