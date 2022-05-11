import {
    Body,
    Controller,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from '../users/dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Authorize and get access token' })
    @ApiResponse({ status: 200 })
    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Body() dto: AuthCredentialsDto) {
        return this.authService.login(dto);
    }

    @ApiOperation({ summary: 'Register new account' })
    @ApiResponse({ status: 200 })
    @UsePipes(ValidationPipe)
    @Post('/registration')
    register(@Body() dto: AuthCredentialsDto) {
        return this.authService.registration(dto);
    }
}
