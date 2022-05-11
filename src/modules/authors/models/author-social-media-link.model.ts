import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from './authors.model';

interface AuthorSocialMediaLinksCreationAttrs {
    authorProfileId: number;
    link: string;
    alias: string;
    socialMediaName: string;
}

@Table({
    tableName: 'author_social_media_links',
})
export class AuthorSocialMediaLinks extends Model<
    AuthorSocialMediaLinks,
    AuthorSocialMediaLinksCreationAttrs
> {
    @ApiProperty({ example: '42', description: 'Unique record identifier' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: '42',
        description: 'Unique author id',
    })
    @ForeignKey(() => Author)
    @Column({
        type: DataType.INTEGER,
        unique: false,
        allowNull: false,
    })
    authorId: number;

    @ApiProperty({
        example: 'vk.com/mypage',
        description: 'Social media link',
    })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    link: string;

    @ApiProperty({
        example: 'My vkontakte page',
        description: 'Social media link alias',
    })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    alias: string;

    @ApiProperty({
        example: 'VK',
        description: 'Social media unique name token',
    })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    socialMediaName: string;
}
