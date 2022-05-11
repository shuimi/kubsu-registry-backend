import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './models/authors.model';
import { CreateAuthorDto } from './dto/create-author.dto';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';

@Injectable()
export class AuthorsService {
    constructor(@InjectModel(Author) private roleRepository: typeof Author) {}

    async createAuthor(dto: CreateAuthorDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async getAuthorById(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async getAuthorsList(page: number, items: number, searchQuery: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async updateAuthor(id: string, dto: CreateAuthorDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async deleteAuthor(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
