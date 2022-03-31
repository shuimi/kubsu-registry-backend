import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { User } from '../../modules/users/users.model';
import { Role } from '../../modules/roles/models/roles.model';

@Table({
    tableName: 'user_roles',
    createdAt: false,
    updatedAt: false,
})
export class UserRoles extends Model<UserRoles> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
    })
    roleId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;
}
