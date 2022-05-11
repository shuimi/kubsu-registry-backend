import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from './models/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Profiles } from './models/profiles.model';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([Profiles, User, Role, UserRoles]),
        RolesModule,
        forwardRef(() => AuthModule),
    ],
    exports: [UsersService],
})
export class UsersModule {}
