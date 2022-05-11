import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from './authors.model';

interface AuthorScientificDisciplinesCreationAttrs {
    authorProfileId: number;
    discipline: string;
}

@Table({
    tableName: 'author_scientific_disciplines',
})
export class AuthorScientificDisciplines extends Model<
    AuthorScientificDisciplines,
    AuthorScientificDisciplinesCreationAttrs
> {
    @ApiProperty({ example: '42', description: 'Unique record identifier' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: '42',
        description: 'Unique author id',
    })
    @ForeignKey(() => Author)
    @Column({
        type: DataType.INTEGER,
        unique: false,
        allowNull: false,
    })
    authorId: number;

    @ApiProperty({
        example: 'Data science',
        description: 'Scientific discipline',
    })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    discipline: string;
}
