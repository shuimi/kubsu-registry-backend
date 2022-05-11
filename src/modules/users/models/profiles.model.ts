import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasOne,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.model';

interface ProfileCreationAttrs {
    firstName: string;
    lastName: string;
    birthDate: string;
    country: string;
    region: string;
    address: string;
}

@Table({
    tableName: 'profiles',
})
export class Profiles extends Model<Profiles, ProfileCreationAttrs> {
    @ApiProperty({ example: '42', description: 'Unique identifier' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Vladimir', description: 'First name' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @ApiProperty({ example: 'Shustov', description: 'Last name' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @ApiProperty({ example: '16.10.2001', description: 'Birthdate' })
    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    birthDate: Date;

    @ApiProperty({ example: 'Russian Federation', description: 'Country' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    country: string;

    @ApiProperty({ example: 'Krasnodarsky Kray', description: 'Region' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    region: string;

    @ApiProperty({ example: 'Stavropolskaya st. 141', description: 'Address' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @HasOne(() => User)
    users: User;
}
