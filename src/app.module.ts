import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/users/models/users.model';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/models/roles.model';
import { UserRoles } from './modules/users/models/user-roles.model';
import { AuthModule } from './modules/auth/auth.module';
import { PublicationsModule } from './modules/publications/publications.module';
import { JournalsModule } from './modules/journals/journals.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { RequestsModule } from './modules/requests/requests.module';
import { JournalRepresentativeModule } from './modules/journal-representative/journal-representative.module';
import { Profile } from './modules/profiles/models/profiles.model';
import { Publication } from './modules/publications/models/publications.model';
import { PublicationAuthors } from './modules/publications/models/publication-authors.model';
import { Journal } from './modules/journals/models/journal.model';
import { JournalAuthors } from './modules/journals/models/journal-authors.model';
import { Author } from './modules/authors/models/authors.model';
import { AuthorScientificDisciplines } from './modules/authors/models/author-scientific-disciplines.model';
import { AuthorSocialMediaLinks } from './modules/authors/models/author-social-media-link.model';
import { JournalRepresentativeProfile } from './modules/journal-representative/models/journal-representative-profile.model';
import { ProfilesModule } from './modules/profiles/profiles.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [
                User,
                Role,
                UserRoles,
                Profile,
                Publication,
                PublicationAuthors,
                Journal,
                JournalAuthors,
                Author,
                AuthorScientificDisciplines,
                AuthorSocialMediaLinks,
                JournalRepresentativeProfile,
            ],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PublicationsModule,
        JournalsModule,
        AuthorsModule,
        RequestsModule,
        JournalRepresentativeModule,
        ProfilesModule,
    ],
})
export class AppModule {}
