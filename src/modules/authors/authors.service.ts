import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './models/authors.model';
import { CreateAuthorDto } from './dto/create-author.dto';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';
import { Op } from 'sequelize';
import { Profile } from '../profiles/models/profiles.model';
import { Status } from '../../shared/domain-types';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectModel(Author) private authorsRepository: typeof Author,
        @InjectModel(Profile) private profilesRepository: typeof Profile,
    ) {}

    async createAuthor(dto: CreateAuthorDto) {
        const author = await this.authorsRepository.findAll({
            where: { profileId: dto.profileId },
            include: { all: true },
        });

        if (author) {
            throw new HttpException(
                'Author already exist',
                HttpStatus.BAD_REQUEST,
            );
        }

        const profile = await this.profilesRepository.findOne({
            where: { id: dto.profileId },
        });

        if (!profile) {
            throw new HttpException(
                'User have no profile, you have to create user profile firstly',
                HttpStatus.BAD_REQUEST,
            );
        }

        const createdAuthor = await this.authorsRepository.create(dto);
        return createdAuthor;
    }

    async getAuthorById(id: string) {
        const author = await this.authorsRepository.findOne({
            where: { id: id },
            include: { all: true },
        });
        if (author) {
            return author;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async getAuthorsList(
        page: number,
        items: number,
        searchQuery: string,
        status?: Status,
    ) {
        const authors = await this.authorsRepository.findAndCountAll({
            where: {
                ...(searchQuery && {
                    [Op.or]: {
                        bio: {
                            [Op.iLike]: `%${searchQuery}%`,
                        },
                    },
                }),
                ...(status && { status: status }),
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

    async updateAuthorStatus(id: string, status: Status) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async deleteAuthor(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
