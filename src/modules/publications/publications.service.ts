import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Publication } from './models/publications.model';
import { Status } from '../../shared/domain-types';

@Injectable()
export class PublicationsService {
    constructor(
        @InjectModel(Publication)
        private publicationsRepository: typeof Publication,
    ) {}

    async createPublication(dto: CreatePublicationDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async getPublicationsList(
        page: number,
        items: number,
        searchQuery: string,
        status?: Status,
    ) {
        const publications = await this.publicationsRepository.findAndCountAll({
            where: {
                ...(searchQuery && {
                    [Op.or]: {
                        title: {
                            [Op.iLike]: `%${searchQuery}%`,
                        },
                        description: {
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
        return publications;
    }

    async getPublicationById(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async updatePublication(id: string, dto: CreatePublicationDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async updatePublicationStatus(id: string, status: Status) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async deletePublication(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
