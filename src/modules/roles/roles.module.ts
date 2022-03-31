import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './models/roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [SequelizeModule.forFeature([Role, User])],
    exports: [RolesService],
})
export class RolesModule {}
