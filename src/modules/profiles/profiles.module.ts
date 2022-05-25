import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './models/profiles.model';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/models/users.model';

@Module({
    controllers: [ProfilesController],
    providers: [ProfilesService],
    imports: [SequelizeModule.forFeature([Profile, User]), AuthModule],
})
export class ProfilesModule {}
