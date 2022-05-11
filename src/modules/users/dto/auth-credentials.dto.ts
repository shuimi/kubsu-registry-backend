import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AuthCredentialsDto {
    @ApiProperty({ example: 'user@mail.com', description: 'Email address' })
    @IsString({ message: 'Must be a string' })
    @IsEmail({}, { message: 'Must be email' })
    readonly email: string;

    @ApiProperty({ example: 'f@J4Sd3$lsc#!', description: 'Password' })
    @IsString({ message: 'Must be a string' })
    @Length(4, 16, {
        message: 'Must be longer than 4 and shorter than 16 symbols',
    })
    readonly password: string;
}
