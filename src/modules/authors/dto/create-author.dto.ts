import { IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
    @ApiProperty({
        example: '42',
        description: 'Unique author profile identifier',
    })
    @IsNumber({}, { message: 'Must be a number' })
    readonly profileId: number;

    @ApiProperty({ example: 'About me', description: 'Bio' })
    @IsString({ message: 'Must be a string' })
    bio: string;
}
