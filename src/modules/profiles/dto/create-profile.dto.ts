import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
    @ApiProperty({ example: 'Vladimir', description: 'First name' })
    @IsString({ message: 'Must be a string' })
    firstName: string;

    @ApiProperty({ example: 'Shustov', description: 'Last name' })
    @IsString({ message: 'Must be a string' })
    lastName: string;

    @ApiProperty({ example: '16.10.2001', description: 'Birthdate' })
    @IsDate({ message: 'Must be a date' })
    birthDate: Date;

    @ApiProperty({ example: 'Russian Federation', description: 'Country' })
    @IsString({ message: 'Must be a string' })
    country: string;

    @ApiProperty({ example: 'Krasnodarsky Kray', description: 'Region' })
    @IsString({ message: 'Must be a string' })
    region: string;

    @ApiProperty({ example: 'Stavropolskaya st. 141', description: 'Address' })
    @IsString({ message: 'Must be a string' })
    address: string;

    @IsNumber({}, { message: 'Must be a number - userId' })
    userId: number;
}
