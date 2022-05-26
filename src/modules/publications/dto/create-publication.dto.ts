import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationDto {
    @ApiProperty({
        example:
            'Application of Machine Learning Algorithms in the Problem of Mixed Data Clustering',
        description: 'Title',
    })
    title: string;

    @ApiProperty({
        example:
            'The article discusses the main unsupervised machine learning algorithms',
        description: 'Description',
    })
    description: string;

    @ApiProperty({
        example: 'https://datahosting.com/link-to-pdf-file',
        description: 'Link',
    })
    link: string;

    @ApiProperty({ example: 'CONFIRMED', description: 'Author account status' })
    status: string;

    @ApiProperty({
        example: '[1, 2, 3, 42]',
        description: 'Authors unique ids',
    })
    authors: number[];

    @ApiProperty({ example: '42', description: 'Journal unique id' })
    journalId: number;
}
