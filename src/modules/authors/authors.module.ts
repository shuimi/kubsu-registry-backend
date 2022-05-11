import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './models/authors.model';
import { Publication } from '../publications/models/publications.model';
import { PublicationAuthors } from '../publications/models/publication-authors.model';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [AuthorsController],
    providers: [AuthorsService],
    imports: [
        SequelizeModule.forFeature([Author, Publication, PublicationAuthors]),
        AuthModule,
    ],
})
export class AuthorsModule {}
