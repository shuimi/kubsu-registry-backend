import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/auth-roles.decorator';
import { Role } from './models/roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: 'Create role' })
    @ApiResponse({ status: 200, type: Role })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @ApiOperation({ summary: 'Get all roles list' })
    @ApiResponse({ status: 200, type: [Role] })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.rolesService.getAll();
    }

    @ApiOperation({ summary: 'Get role' })
    @ApiResponse({ status: 200, type: Role })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.rolesService.getRoleById(id);
    }
}
