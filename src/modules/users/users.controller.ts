import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/users.model';
import { Roles } from '../auth/decorators/auth-roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GiveRoleDto } from './dto/give-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Get all users list' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Give a role' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    giveRole(@Body() dto: GiveRoleDto) {
        return this.usersService.giveRole(dto);
    }

    @ApiOperation({ summary: 'Ban a user' })
    @ApiResponse({ status: 200, type: User })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }

    @ApiOperation({ summary: 'Unban a user' })
    @ApiResponse({ status: 200, type: User })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/unban/:id')
    unban(@Param('id') id: string) {
        return this.usersService.unban(id);
    }
}
