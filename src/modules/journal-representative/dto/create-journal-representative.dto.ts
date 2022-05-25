import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateJournalRepresentativeDto {
    @ApiProperty({
        example: 'https://base.com/link-to-pic',
        description: 'Identity document link',
    })
    @IsString({ message: 'Must be a string' })
    identityDocumentLink: string;

    @ApiProperty({
        example: '3889 912392',
        description: 'Government id number',
    })
    @IsString({ message: 'Must be a string' })
    governmentId: string;

    @ApiProperty({
        example: 'ООО Малина',
        description: 'Represented legal entity name',
    })
    @IsString({ message: 'Must be a string' })
    representedLegalEntity: string;

    @ApiProperty({
        example: '8 800 555 35 35',
        description: 'Legal entity phone number',
    })
    @IsString({ message: 'Must be a string' })
    legalEntityPhoneNumber: string;

    @ApiProperty({
        example: 'legalentity@gmail.com',
        description: 'Legal entity email',
    })
    @IsString({ message: 'Must be a string' })
    legalEntityEmail: string;

    @ApiProperty({
        example: '8 800 555 35 35',
        description: `Legal entity representative's phone number`,
    })
    @IsString({ message: 'Must be a string' })
    phoneNumber: string;

    @ApiProperty({
        example: '42',
        description: `User id`,
    })
    @IsNumber({}, { message: 'Must be a number' })
    userId: number;
}
