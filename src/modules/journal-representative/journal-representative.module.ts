import { Module } from '@nestjs/common';
import { JournalRepresentativeController } from './journal-representative.controller';
import { JournalRepresentativeService } from './journal-representative.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { JournalRepresentativeProfile } from './models/journal-representative-profile.model';
import { User } from '../users/models/users.model';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [JournalRepresentativeController],
    providers: [JournalRepresentativeService],
    imports: [
        SequelizeModule.forFeature([JournalRepresentativeProfile, User]),
        AuthModule,
    ],
})
export class JournalRepresentativeModule {}
