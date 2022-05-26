import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';
import { CreateJournalDto } from './dto/create-journal.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Journal } from './models/journal.model';
import { Op } from 'sequelize';
import { Status } from '../../shared/domain-types';

@Injectable()
export class JournalsService {
    constructor(
        @InjectModel(Journal) private journalsRepository: typeof Journal,
    ) {}

    async createJournal(dto: CreateJournalDto) {
        const journal = await this.journalsRepository.findOne({
            where: { name: dto.name },
        });

        if (journal) {
            throw new HttpException(
                'Journal name already taken',
                HttpStatus.BAD_REQUEST,
            );
        }

        const createdJournal = await this.journalsRepository.create(dto);
        return createdJournal;
    }

    async getJournalsList(
        page: number,
        items: number,
        searchQuery: string,
        status: Status,
    ) {
        const journals = await this.journalsRepository.findAndCountAll({
            where: searchQuery
                ? {
                      [Op.or]: {
                          name: {
                              [Op.iLike]: `%${searchQuery}%`,
                          },
                          description: {
                              [Op.iLike]: `%${searchQuery}%`,
                          },
                      },
                      status: status,
                  }
                : {
                      status: status,
                  },
            limit: items ? items : 10,
            offset: items ? (page ? items * page : 0) : page ? page * 10 : 0,
            include: { all: true },
        });
        return journals;
    }

    async getJournalById(id: string) {
        const journal = await this.journalsRepository.findOne({
            where: { id: id },
        });
        if (journal) {
            return journal;
        }
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    async updateJournal(id: string, dto: CreateJournalDto) {
        const journal = await this.journalsRepository.findOne({
            where: { id: id },
        });

        if (journal) {
            journal.journalRepresentativeProfileId =
                dto.journalRepresentativeProfileId;
            journal.description = dto.description;
            journal.name = dto.name;
            journal.status = dto.status;

            await journal.save();
            return journal;
        }

        throw new HttpException('Journal not found', HttpStatus.NOT_FOUND);
    }

    async deleteJournal(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
