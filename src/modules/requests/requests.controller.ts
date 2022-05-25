import { Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/auth-roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Journal } from '../journals/models/journal.model';
import { Author } from '../authors/models/authors.model';
import { Publication } from '../publications/models/publications.model';

@ApiTags('Requests moderation')
@Controller('requests')
export class RequestsController {
    constructor(private requestsService: RequestsService) {}

    @ApiOperation({ summary: 'Get journal registration requests' })
    @ApiResponse({ status: 200, type: [Journal] })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/journals/?')
    getJournalRegistrationRequestsList(
        @Query('page') page: number,
        @Query('items') items: number,
        @Query('query') searchQuery: string,
    ) {
        return this.requestsService.getJournalsRequestsList(
            page,
            items,
            searchQuery,
        );
    }

    @ApiOperation({ summary: 'Get author registration requests' })
    @ApiResponse({ status: 200, type: [Author] })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/authors/?')
    getAuthorRegistrationRequestsList(
        @Query('page') page: number,
        @Query('items') items: number,
        @Query('query') searchQuery: string,
    ) {
        return this.requestsService.getAuthorsRequestsList(
            page,
            items,
            searchQuery,
        );
    }

    @ApiOperation({ summary: 'Get publication registration requests' })
    @ApiResponse({ status: 200, type: [Publication] })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/publications/?')
    publicationRegistrationRequests(
        @Query('page') page: number,
        @Query('items') items: number,
        @Query('query') searchQuery: string,
    ) {
        return this.requestsService.getPublicationsRequestsList(
            page,
            items,
            searchQuery,
        );
    }

    @ApiOperation({ summary: 'Update journal registration request by id' })
    @ApiResponse({ status: 200, type: [Journal] })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/journals/:id/?')
    updateJournalRegistrationRequestStatus(
        @Param('id') id: string,
        @Query('status') status: string,
    ) {
        return this.requestsService.updateJournalStatus(id, status);
    }

    @ApiOperation({ summary: 'Update author registration request by id' })
    @ApiResponse({ status: 200, type: [Author] })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/authors/:id/?')
    updateAuthorRegistrationRequestStatus(
        @Param('id') id: string,
        @Query('status') status: string,
    ) {
        return this.requestsService.updateAuthorStatus(id, status);
    }

    @ApiOperation({ summary: 'Update publication registration request by id' })
    @ApiResponse({ status: 200, type: [Publication] })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/publications/:id/?')
    updatePublicationRegistrationRequestStatus(
        @Param('id') id: string,
        @Query('status') status: string,
    ) {
        return this.requestsService.updatePublicationStatus(id, status);
    }
}
