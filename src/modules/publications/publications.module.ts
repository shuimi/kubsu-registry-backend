import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Publications } from './models/publications.model';
import { PublicationAuthors } from './models/publication-authors.model';
import { Author } from '../authors/models/authors.model';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [PublicationsController],
    providers: [PublicationsService],
    imports: [
        SequelizeModule.forFeature([Author, Publications, PublicationAuthors]),
        AuthModule,
    ],
})
export class PublicationsModule {}
