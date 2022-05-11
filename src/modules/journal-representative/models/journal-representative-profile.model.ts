import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/models/users.model';

interface JournalRepresentativeProfileCreationAttrs {
    identityDocumentLink: string;
    governmentId: string;
    representedLegalEntity: string;
    legalEntityPhoneNumber: string;
    legalEntityEmail: string;
    phoneNumber: string;
    userId: number;
}

@Table({
    tableName: 'journal_representative_profile',
})
export class JournalRepresentativeProfile extends Model<
    JournalRepresentativeProfile,
    JournalRepresentativeProfileCreationAttrs
> {
    @ApiProperty({ example: '42', description: 'Unique user identifier' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 'https://base.com/link-to-pic',
        description: 'Identity document link',
    })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    identityDocumentLink: string;

    @ApiProperty({
        example: '3889 912392',
        description: 'Government id number',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    governmentId: string;

    @ApiProperty({
        example: 'ООО Малина',
        description: 'Represented legal entity name',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    representedLegalEntity: string;

    @ApiProperty({
        example: '8 800 555 35 35',
        description: 'Legal entity phone number',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    legalEntityPhoneNumber: string;

    @ApiProperty({
        example: 'legalentity@gmail.com',
        description: 'Legal entity email',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    legalEntityEmail: string;

    @ApiProperty({
        example: '8 800 555 35 35',
        description: `Legal entity representative's phone number`,
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    phoneNumber: string;

    @BelongsTo(() => User)
    users: User;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        unique: true,
    })
    userId: number;
}
