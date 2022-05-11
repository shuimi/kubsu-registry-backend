import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/auth-roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JournalRepresentativeService } from './journal-representative.service';
import { JournalRepresentativeProfile } from './models/journal-representative-profile.model';
import { CreateJournalRepresentativeDto } from './dto/create-journal-representative.dto';

@ApiTags('Journal Representatives Profiles')
@Controller('journal-representative')
export class JournalRepresentativeController {
    constructor(private representativeService: JournalRepresentativeService) {}

    @ApiOperation({ summary: 'Register representative' })
    @ApiResponse({ status: 200, type: JournalRepresentativeProfile })
    @Roles('JOURNAL')
    @UseGuards(RolesGuard)
    @Post()
    createProfile(@Body() dto: CreateJournalRepresentativeDto) {
        return this.representativeService.createProfile(dto);
    }

    @ApiOperation({ summary: 'Get an representatives list' })
    @ApiResponse({ status: 200, type: [JournalRepresentativeProfile] })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getProfilesList() {
        return this.representativeService.getProfilesList();
    }

    @ApiOperation({ summary: 'Get representative by id' })
    @ApiResponse({ status: 200, type: JournalRepresentativeProfile })
    @Get('/:id')
    getProfile(@Param('id') id: string) {
        return this.representativeService.getProfileById(id);
    }

    @ApiOperation({ summary: 'Update representative with provided id' })
    @ApiResponse({ status: 200, type: JournalRepresentativeProfile })
    @Roles('JOURNAL')
    @UseGuards(RolesGuard)
    @Put('/:id')
    updateProfile(
        @Param('id') id: string,
        @Body() dto: CreateJournalRepresentativeDto,
    ) {
        return this.representativeService.updateProfile(id, dto);
    }

    @ApiOperation({ summary: 'Delete representative by id' })
    @ApiResponse({ status: 200, type: JournalRepresentativeProfile })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    deleteProfile(@Param('id') id: string) {
        return this.representativeService.deleteProfile(id);
    }
}
