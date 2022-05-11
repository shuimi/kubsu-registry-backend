import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';

@Injectable()
export class PublicationsService {
    createPublication(dto: CreatePublicationDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    getPublicationsList(page: number, items: number, searchQuery: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    getPublicationById(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    updatePublication(id: string, dto: CreatePublicationDto) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }

    deletePublication(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
