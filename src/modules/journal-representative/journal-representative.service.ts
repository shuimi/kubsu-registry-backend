import { Injectable } from '@nestjs/common';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';
import { CreateJournalRepresentativeDto } from './dto/create-journal-representative.dto';

@Injectable()
export class JournalRepresentativeService {
    async createProfile(dto: CreateJournalRepresentativeDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    getProfilesList() {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    getProfileById(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    updateProfile(id: string, dto: CreateJournalRepresentativeDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    deleteProfile(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
