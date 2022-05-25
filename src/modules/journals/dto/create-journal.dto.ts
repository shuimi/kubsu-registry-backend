import { ApiProperty } from '@nestjs/swagger';

export class CreateJournalDto {
    @ApiProperty({
        example: 'JournalName',
        description: 'Journal name',
    })
    name: string;

    @ApiProperty({
        example: 'Scientific journal',
        description: 'Journal description',
    })
    description: string;

    @ApiProperty({
        example: '42',
        description: 'Journal representative profile unique id',
    })
    journalRepresentativeProfileId: number;

    @ApiProperty({
        example: 'PENDING',
        description: 'Journal registration status',
    })
    status: string;
}
