import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    IsEnum,
    IsArray,
    IsOptional,
} from 'class-validator';

export class NewApplicationDto {
    @ApiProperty({
        description: 'Descreve o nome da sua aplicação. Deverá ser um valor único pois um identificador será gerado em Kebab Case.',
    })
    @IsNotEmpty()
    @Length(3)
    name: string;

    @ApiProperty({
        description: 'Descreve o tipo da sua aplicação entre lado do cliente e lado do servidor. Importante: não utilize tokens server-side em aplicações client-side, caso contrário seu limite de requisições poderá rapidamente ser consumido.',
        enum: ['client-side', 'server-side'],
    })
    @IsNotEmpty()
    @IsEnum(['client-side', 'server-side'])
    type: string;

    @ApiProperty({
        description: 'Descreve o domínio de origem da requisição, para aplicações do lado do cliente apenas, permitindo manter controle das requisições via CORS.',
    })
    // @IsFQDN()
    @IsArray()
    @IsOptional()
    requestOrigin: string[];

    @ApiProperty({
        description: 'Descreve o seu nome, de preferência completo, para em caso de necessidade de contato',
    })
    @IsNotEmpty()
    @Length(3)
    ownerName: string;

    @ApiProperty({
        description: 'Descreve o seu e-mail, necessário para confirmar sua aplicação em futura versões',
    })
    @IsEmail()
    ownerEmail: string;
}

export class BlacklistJwtDto {
    @ApiProperty()
    @IsString()
    jwt: string;
}