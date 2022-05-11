import {
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { JournalRepresentativeProfile } from '../../journal-representative/models/journal-representative-profile.model';
import { Author } from '../../authors/models/authors.model';
import { Publications } from '../../publications/models/publications.model';
import { JournalAuthors } from './journal-authors.model';

interface JournalCreationAttrs {
    name: string;
    description: string;
}

@Table({
    tableName: 'journals',
})
export class Journals extends Model<Journals, JournalCreationAttrs> {
    @ApiProperty({ example: '42', description: 'Unique journal identifier' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 'JournalName',
        description: 'Journal name',
    })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        example: 'Scientific journal',
        description: 'Journal description',
    })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    description: string;

    @ApiProperty({
        example: '42',
        description: 'Journal representative profile unique id',
    })
    @ForeignKey(() => JournalRepresentativeProfile)
    @Column({
        type: DataType.INTEGER,
        unique: true,
    })
    journalRepresentativeProfileId: number;

    @ApiProperty({
        example: 'PENDING',
        description: 'Journal registration status',
    })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
        defaultValue: 'PENDING',
    })
    status: string;

    @BelongsToMany(() => Author, () => JournalAuthors)
    authors: Author[];

    @HasMany(() => Publications)
    publications: Publications[];
}
