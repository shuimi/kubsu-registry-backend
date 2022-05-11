import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/models/users.model';
import { UserRoles } from '../../users/models/user-roles.model';

interface RoleCreationAttrs {
    id: string;
    description: string;
}

@Table({
    tableName: 'roles',
})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({ example: '42', description: 'Unique identifier' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'ADMIN', description: 'Unique role identifier' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    roleId: string;

    @ApiProperty({ example: 'Administrator', description: 'Role description' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}
