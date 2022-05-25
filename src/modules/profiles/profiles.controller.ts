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
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profile } from './models/profiles.model';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Roles } from '../auth/decorators/auth-roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

    @ApiOperation({ summary: 'Create profile' })
    @ApiResponse({ status: 200, type: Profile })
    @UsePipes(ValidationPipe)
    @Post()
    createProfile(@Body() dto: CreateProfileDto) {
        return this.profilesService.createProfile(dto);
    }

    @ApiOperation({ summary: 'Get profiles list' })
    @ApiResponse({ status: 200, type: [Profile] })
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
    getProfilesList(
        @Query('page') page?: number,
        @Query('items') items?: number,
        @Query('query') searchQuery?: string,
    ) {
        return this.profilesService.getProfilesList(page, items, searchQuery);
    }

    @ApiOperation({ summary: 'Get profile by id' })
    @ApiResponse({ status: 200, type: Profile })
    @Get('/:id')
    getProfileById(@Param('id') id: string) {
        return this.profilesService.getProfileById(id);
    }

    @ApiOperation({ summary: 'Get profile by user id' })
    @ApiResponse({ status: 200, type: Profile })
    @Get('/user/:id')
    getProfileByUserId(@Param('id') id: string) {
        return this.profilesService.getProfileByUserId(id);
    }

    @ApiOperation({ summary: 'Update profile with provided id' })
    @ApiResponse({ status: 200, type: Profile })
    @Put('/:id')
    updateProfile(@Param('id') id: string, @Body() dto: CreateProfileDto) {
        return this.profilesService.updateProfile(id, dto);
    }

    @ApiOperation({ summary: 'Delete profile by id' })
    @ApiResponse({ status: 200, type: Profile })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteProfile(@Param('id') id: string) {
        return this.profilesService.deleteProfile(id);
    }
}
