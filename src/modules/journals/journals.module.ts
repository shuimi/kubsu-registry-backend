import { Module } from '@nestjs/common';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Journals } from './models/journal.model';
import { JournalAuthors } from './models/journal-authors.model';
import { Author } from '../authors/models/authors.model';
import { Publications } from '../publications/models/publications.model';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [JournalsController],
    providers: [JournalsService],
    imports: [
        SequelizeModule.forFeature([
            Journals,
            JournalAuthors,
            Author,
            Publications,
        ]),
        AuthModule,
    ],
})
export class JournalsModule {}
