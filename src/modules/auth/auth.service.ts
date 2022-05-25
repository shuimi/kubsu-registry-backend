import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from '../users/dto/auth-credentials.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/models/users.model';

@Injectable()
export class AuthService {
    private salt = 5;

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(dto: AuthCredentialsDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    async registration(dto: AuthCredentialsDto) {
        const candidate = await this.usersService.getUserByEmail(dto.email);
        if (candidate) {
            throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
        }
        const passwordHash = await bcrypt.hash(dto.password, this.salt);
        const user = await this.usersService.createUser({
            ...dto,
            password: passwordHash,
        });
        return this.generateToken(user);
    }

    private generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(dto: AuthCredentialsDto): Promise<User> {
        const user = await this.usersService.getUserByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(
            dto.password,
            user.password,
        );
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({
            message: `Incorrect email or password`,
        });
    }
}
