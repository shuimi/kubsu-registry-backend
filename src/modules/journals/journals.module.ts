import { Module } from '@nestjs/common';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Journal } from './models/journal.model';
import { JournalAuthors } from './models/journal-authors.model';
import { Author } from '../authors/models/authors.model';
import { Publication } from '../publications/models/publications.model';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [JournalsController],
    providers: [JournalsService],
    imports: [
        SequelizeModule.forFeature([
            Journal,
            JournalAuthors,
            Author,
            Publication,
        ]),
        AuthModule,
    ],
})
export class JournalsModule {}
