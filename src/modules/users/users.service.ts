import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RolesService } from '../roles/roles.service';
import { GiveRoleDto } from './dto/give-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private rolesService: RolesService,
    ) {}

    async createUser(dto: AuthCredentialsDto) {
        const userByEmail = await this.getUserByEmail(dto.email);
        if (userByEmail) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST,
            );
        }

        const role = await this.rolesService.getRoleById('USER');
        if (!role) {
            throw new HttpException(
                `Mom, I\'m on TV`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        const user = await this.userRepository.create(dto);
        await user.$set('roles', [role.id]);
        user.roles = [role];

        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: { all: true },
        });
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });
        return user;
    }

    async giveRole(dto: GiveRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleById(dto.roleId);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }

    async unban(id: string) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        user.banned = false;
        user.banReason = null;
        await user.save();
        return user;
    }
}
