import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Role identifier token' })
    @Length(2, 16, {
        message: 'Must be longer than 2 and shorter than 16 symbols',
    })
    @IsString({ message: 'Must be a string' })
    readonly roleId: string;

    @ApiProperty({ example: 'Administrator', description: 'Role description' })
    @IsString({ message: 'Must be a string' })
    readonly description: string;
}
