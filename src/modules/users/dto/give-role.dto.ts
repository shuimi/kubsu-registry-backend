import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GiveRoleDto {
    @ApiProperty({
        example: 'ADMIN',
        description: 'Role unique identifier token',
    })
    @IsString({ message: 'Must be a string' })
    readonly roleId: string;

    @ApiProperty({ example: '42', description: 'User unique identifier' })
    readonly userId: number;
}
