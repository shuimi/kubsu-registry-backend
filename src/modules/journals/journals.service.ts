import { Injectable } from '@nestjs/common';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';
import { CreateJournalDto } from './dto/create-journal.dto';

@Injectable()
export class JournalsService {
    async createJournal(dto: CreateJournalDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async getJournalsList(page: number, items: number, searchQuery: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async getJournalById(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async updateJournal(id: string, dto: CreateJournalDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async deleteJournal(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
