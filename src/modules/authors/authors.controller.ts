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
    @Post()
    createAuthor(@Body() dto: CreateAuthorDto) {
        return this.authorsService.createAuthor(dto);
    }

    @ApiOperation({ summary: 'Get an authors list' })
    @ApiResponse({ status: 200, type: [Author] })
    @Get()
    getAuthorsList() {
        return this.authorsService.getAuthorsList();
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

    @ApiOperation({ summary: 'Search authors by name' })
    @ApiResponse({ status: 200, type: [Author] })
    @Get('/search/:query')
    searchAuthors(@Param('query') query: string) {
        return this.authorsService.searchAuthorsByName(query);
    }

    @ApiOperation({ summary: 'Delete author by id' })
    @ApiResponse({ status: 200, type: Author })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    deleteAuthor(@Param('id') id: string) {
        return this.authorsService.deleteAuthor(id);
    }
}
