import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from '../authors/models/authors.model';
import { Publication } from '../publications/models/publications.model';
import { Journal } from '../journals/models/journal.model';
import { JournalsModule } from '../journals/journals.module';
import { AuthorsModule } from '../authors/authors.module';
import { PublicationsModule } from '../publications/publications.module';

@Module({
    controllers: [RequestsController],
    providers: [RequestsService],
    imports: [
        SequelizeModule.forFeature([Author, Publication, Journal]),
        AuthModule,
        JournalsModule,
        AuthorsModule,
        PublicationsModule,
    ],
})
export class RequestsModule {}
