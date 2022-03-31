import {
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

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
export class Profile extends Model<Profile, ProfileCreationAttrs> {
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

    @ApiProperty({ example: 'Administrator', description: 'Role description' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;
}
