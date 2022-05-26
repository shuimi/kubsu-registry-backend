import { Injectable } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { JournalsService } from '../journals/journals.service';
import { PublicationsService } from '../publications/publications.service';
import { Status } from '../../shared/domain-types';

@Injectable()
export class RequestsService {
    constructor(
        private authorsService: AuthorsService,
        private journalsService: JournalsService,
        private publicationsService: PublicationsService,
    ) {}

    async getJournalsRequestsList(
        page: number,
        items: number,
        searchQuery: string,
    ) {
        return this.journalsService.getJournalsList(page, items, searchQuery);
    }

    async getAuthorsRequestsList(
        page: number,
        items: number,
        searchQuery: string,
    ) {
        return this.authorsService.getAuthorsList(page, items, searchQuery);
    }

    async getPublicationsRequestsList(
        page: number,
        items: number,
        searchQuery: string,
    ) {
        return this.publicationsService.getPublicationsList(
            page,
            items,
            searchQuery,
        );
    }

    updateJournalStatus(id: string, status: Status) {
        return this.journalsService.updateJournalStatus(id, status);
    }

    updateAuthorStatus(id: string, status: Status) {
        return this.authorsService.updateAuthorStatus(id, status);
    }

    updatePublicationStatus(id: string, status: Status) {
        return this.publicationsService.updatePublicationStatus(id, status);
    }
}
