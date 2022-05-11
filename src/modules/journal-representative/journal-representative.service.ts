import { Injectable } from '@nestjs/common';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';
import { CreateJournalRepresentativeDto } from './dto/create-journal-representative.dto';

@Injectable()
export class JournalRepresentativeService {
    async createProfile(dto: CreateJournalRepresentativeDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async getProfilesList(page: number, items: number, searchQuery: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async getProfileById(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async updateProfile(id: string, dto: CreateJournalRepresentativeDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async deleteProfile(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
