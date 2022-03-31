import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/users/users.model';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/models/roles.model';
import { UserRoles } from './shared/models/user-roles.model';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profiles/profile.module';
import { RequestsModule } from './modules/requests/requests.module';
import { PublicationsModule } from './modules/publications/publications.module';
import { JournalsModule } from './modules/journals/journals.module';
import { AuthorsModule } from './modules/authors/authors.module';

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
            models: [User, Role, UserRoles],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ProfileModule,
        RequestsModule,
        PublicationsModule,
        JournalsModule,
        AuthorsModule,
    ],
})
export class AppModule {}
