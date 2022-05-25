import {
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasOne,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/models/roles.model';
import { UserRoles } from './user-roles.model';
import { Profile } from '../../profiles/models/profiles.model';
import { JournalRepresentativeProfile } from '../../journal-representative/models/journal-representative-profile.model';

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({
    tableName: 'users',
})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '42', description: 'Unique identifier' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'user@mail.com', description: 'Email address' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @ApiProperty({ example: 'f@J4Sd3$lsc#!', description: 'Password' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @ApiProperty({ example: 'true', description: 'Ban flag' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    banned: boolean;

    @ApiProperty({
        example: 'Service policy violation',
        description: 'Ban reason',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @ForeignKey(() => Profile)
    profileId: number;

    @HasOne(() => JournalRepresentativeProfile)
    journalRepresentativeProfileId: JournalRepresentativeProfile;
}
