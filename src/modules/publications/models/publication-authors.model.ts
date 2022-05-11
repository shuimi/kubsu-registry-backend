import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Publications } from './publications.model';
import { Author } from '../../authors/models/authors.model';

@Table({
    tableName: 'publication_authors',
    createdAt: false,
    updatedAt: false,
})
export class PublicationAuthors extends Model<PublicationAuthors> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Publications)
    @Column({
        type: DataType.INTEGER,
    })
    publicationId: number;

    @ForeignKey(() => Author)
    @Column({
        type: DataType.INTEGER,
    })
    authorId: number;
}
