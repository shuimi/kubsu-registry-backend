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
import { Author } from './models/authors.model';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Roles } from '../auth/decorators/auth-roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
    constructor(private authorsService: AuthorsService) {}

    @ApiOperation({ summary: 'Register an author' })
    @ApiResponse({ status: 200, type: Author })
    @UsePipes(ValidationPipe)
    @Post()
    createAuthor(@Body() dto: CreateAuthorDto) {
        return this.authorsService.createAuthor(dto);
    }

    @ApiOperation({ summary: 'Get an authors list' })
    @ApiResponse({ status: 200, type: [Author] })
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
    getAuthorsList(
        @Query('page') page?: number,
        @Query('items') items?: number,
        @Query('query') searchQuery?: string,
    ) {
        return this.authorsService.getAuthorsList(
            page,
            items,
            searchQuery,
            'APPROVED',
        );
    }

    @ApiOperation({ summary: 'Get an author by id' })
    @ApiResponse({ status: 200, type: Author })
    @Get('/:id')
    getAuthor(@Param('id') id: string) {
        return this.authorsService.getAuthorById(id);
    }

    @ApiOperation({ summary: 'Update author with provided id' })
    @ApiResponse({ status: 200, type: Author })
    @Put('/:id')
    updateAuthor(@Param('id') id: string, @Body() dto: CreateAuthorDto) {
        return this.authorsService.updateAuthor(id, dto);
    }

    @ApiOperation({ summary: 'Delete author by id' })
    @ApiResponse({ status: 200, type: Author })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteAuthor(@Param('id') id: string) {
        return this.authorsService.deleteAuthor(id);
    }
}
