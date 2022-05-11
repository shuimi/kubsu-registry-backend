import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Author } from '../../authors/models/authors.model';
import { Journal } from './journal.model';

@Table({
    tableName: 'journal_authors',
    createdAt: false,
    updatedAt: false,
})
export class JournalAuthors extends Model<JournalAuthors> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Journal)
    @Column({
        type: DataType.INTEGER,
    })
    journalId: number;

    @ForeignKey(() => Author)
    @Column({
        type: DataType.INTEGER,
    })
    authorId: number;
}
