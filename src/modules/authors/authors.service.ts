import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './models/authors.model';
import { CreateAuthorDto } from './dto/create-author.dto';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';
import { User } from '../users/models/users.model';
import { Op } from 'sequelize';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectModel(Author) private authorsRepository: typeof Author,
        @InjectModel(User) private usersRepository: typeof User,
    ) {}

    async createAuthor(dto: CreateAuthorDto) {
        const authorProfile = await this.authorsRepository.findAll({
            where: { userId: dto.userId },
            include: { all: true },
        });

        if (authorProfile) {
            throw new HttpException(
                'Author already exist',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.usersRepository.findOne({
            where: { id: dto.userId },
        });

        if (user.profileId == null) {
            throw new HttpException(
                'User have no profile, you have to create user profile firstly',
                HttpStatus.BAD_REQUEST,
            );
        }

        const author = await this.authorsRepository.create(dto);
        return author;
    }

    async getAuthorById(id: string) {
        const author = await this.authorsRepository.findOne({
            where: { id: id },
        });
        if (author) {
            return author;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async getAuthorsList(page: number, items: number, searchQuery: string) {
        const authors = await this.authorsRepository.findAndCountAll({
            where: searchQuery && {
                [Op.or]: {
                    bio: {
                        [Op.iLike]: `%${searchQuery}%`,
                    },
                },
            },
            limit: items && items,
            offset: (page && items && items * page) || (page && page),
            include: { all: true },
        });
        return authors;
    }

    async updateAuthor(id: string, dto: CreateAuthorDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async deleteAuthor(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
