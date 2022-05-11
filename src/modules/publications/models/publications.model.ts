import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../../authors/models/authors.model';
import { PublicationAuthors } from './publication-authors.model';
import { Journal } from '../../journals/models/journal.model';

interface PublicationCreationAttrs {
    title: string;
    description: string;
    link: string;
}

@Table({
    tableName: 'publications',
})
export class Publication extends Model<Publication, PublicationCreationAttrs> {
    @ApiProperty({
        example: '42',
        description: 'Unique publication identifier',
    })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example:
            'Application of Machine Learning Algorithms in the Problem of Mixed Data Clustering',
        description: 'Title',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: true,
    })
    title: string;

    @ApiProperty({
        example:
            'The article discusses the main unsupervised machine learning algorithms',
        description: 'Description',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: true,
    })
    description: string;

    @ApiProperty({
        example: 'https://datahosting.com/link-to-pdf-file',
        description: 'Link',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: true,
    })
    link: string;

    @ApiProperty({ example: 'CONFIRMED', description: 'Author account status' })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
        defaultValue: 'PENDING',
    })
    status: string;

    @BelongsToMany(() => Author, () => PublicationAuthors)
    authors: Author[];

    @BelongsTo(() => Journal)
    journals: Journal;

    @ForeignKey(() => Journal)
    @Column({
        allowNull: true,
        type: DataType.INTEGER,
        unique: true,
    })
    journalId: number;
}
