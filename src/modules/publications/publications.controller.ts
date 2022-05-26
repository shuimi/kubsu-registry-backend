import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/auth-roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PublicationsService } from './publications.service';
import { Publication } from './models/publications.model';
import { CreatePublicationDto } from './dto/create-publication.dto';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
    constructor(private publicationsService: PublicationsService) {}

    @ApiOperation({ summary: 'Register publication' })
    @ApiResponse({ status: 200, type: Publication })
    @Roles('JOURNAL', 'ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    createPublication(@Body() dto: CreatePublicationDto) {
        return this.publicationsService.createPublication(dto);
    }

    @ApiOperation({ summary: 'Get publications list' })
    @ApiResponse({ status: 200, type: [Publication] })
    @ApiQuery({
        name: 'page',
        type: Number,
        description: 'Page number, optional, 1 by default',
        required: false,
    })
    @ApiQuery({
        name: 'items',
        type: Number,
        description: 'Items amount, optional, 10 by default',
        required: false,
    })
    @ApiQuery({
        name: 'query',
        type: String,
        description: 'Search query, optional',
        required: false,
    })
    @Get('/?')
    getPublicationsList(
        @Query('page') page?: number,
        @Query('items') items?: number,
        @Query('query') searchQuery?: string,
    ) {
        return this.publicationsService.getPublicationsList(
            page,
            items,
            searchQuery,
            'APPROVED',
        );
    }

    @ApiOperation({ summary: 'Get publication by id' })
    @ApiResponse({ status: 200, type: Publication })
    @Get('/:id')
    getPublication(@Param('id') id: string) {
        return this.publicationsService.getPublicationById(id);
    }

    @ApiOperation({ summary: 'Update publication with provided id' })
    @ApiResponse({ status: 200, type: Publication })
    @Roles('JOURNAL', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    updatePublication(
        @Param('id') id: string,
        @Body() dto: CreatePublicationDto,
    ) {
        return this.publicationsService.updatePublication(id, dto);
    }

    @ApiOperation({ summary: 'Delete publication by id' })
    @ApiResponse({ status: 200, type: Publication })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deletePublication(@Param('id') id: string) {
        return this.publicationsService.deletePublication(id);
    }
}
