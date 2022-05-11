import {
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Profiles } from '../../users/models/profiles.model';
import { PublicationAuthors } from '../../publications/models/publication-authors.model';
import { Publications } from '../../publications/models/publications.model';
import { JournalAuthors } from '../../journals/models/journal-authors.model';
import { Journals } from '../../journals/models/journal.model';

interface AuthorCreationAttrs {
    profileId: number;
    userId: number;
    bio: string;
}

@Table({
    tableName: 'authors',
})
export class Author extends Model<Author, AuthorCreationAttrs> {
    @ApiProperty({ example: '42', description: 'Unique author identifier' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: '42',
        description: 'Unique author profile identifier',
    })
    @ForeignKey(() => Profiles)
    @Column({
        type: DataType.INTEGER,
        unique: true,
    })
    profileId: number;

    @ApiProperty({ example: '42', description: 'Unique user identifier' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: true,
    })
    userId: number;

    @ApiProperty({ example: 'CONFIRMED', description: 'Author account status' })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
        defaultValue: 'PENDING',
    })
    status: string;

    @ApiProperty({ example: 'About me', description: 'Bio' })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: true,
    })
    bio: string;

    @BelongsToMany(() => Publications, () => PublicationAuthors)
    publications: Publications[];

    @BelongsToMany(() => Journals, () => JournalAuthors)
    journals: Journals[];
}
