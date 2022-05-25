import { Injectable } from '@nestjs/common';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';

@Injectable()
export class RequestsService {
    async getJournalsRequestsList(
        page: number,
        items: number,
        searchQuery: string,
    ) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async getAuthorsRequestsList(
        page: number,
        items: number,
        searchQuery: string,
    ) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    async getPublicationsRequestsList(
        page: number,
        items: number,
        searchQuery: string,
    ) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    updateJournalStatus(id: string, status: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    updateAuthorStatus(id: string, status: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    updatePublicationStatus(id: string, status: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
