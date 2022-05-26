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
import { JournalsService } from './journals.service';
import { Journal } from './models/journal.model';
import { CreateJournalDto } from './dto/create-journal.dto';

@ApiTags('Journals')
@Controller('journals')
export class JournalsController {
    constructor(private journalsService: JournalsService) {}

    @ApiOperation({ summary: 'Register journal' })
    @ApiResponse({ status: 200, type: Journal })
    @Roles('JOURNAL', 'ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    createJournal(@Body() dto: CreateJournalDto) {
        return this.journalsService.createJournal(dto);
    }

    @ApiOperation({ summary: 'Get journals list' })
    @ApiResponse({ status: 200, type: [Journal] })
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
    getJournalsList(
        @Query('page') page?: number,
        @Query('items') items?: number,
        @Query('query') searchQuery?: string,
    ) {
        return this.journalsService.getJournalsList(
            page,
            items,
            searchQuery,
            'APPROVED',
        );
    }

    @ApiOperation({ summary: 'Get journal by id' })
    @ApiResponse({ status: 200, type: Journal })
    @Get('/:id')
    getJournal(@Param('id') id: string) {
        return this.journalsService.getJournalById(id);
    }

    @ApiOperation({ summary: 'Update journal with provided id' })
    @ApiResponse({ status: 200, type: Journal })
    @Roles('JOURNAL', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    updateJournal(@Param('id') id: string, @Body() dto: CreateJournalDto) {
        return this.journalsService.updateJournal(id, dto);
    }

    @ApiOperation({ summary: 'Delete journal by id' })
    @ApiResponse({ status: 200, type: Journal })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteJournal(@Param('id') id: string) {
        return this.journalsService.deleteJournal(id);
    }
}
