import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
    @ApiProperty({ example: '42', description: 'User unique identifier' })
    readonly userId: number;

    @ApiProperty({
        example: 'Violation of community rules',
        description: 'Ban reason',
    })
    @IsString({ message: 'Must be a string' })
    readonly banReason: string;
}
