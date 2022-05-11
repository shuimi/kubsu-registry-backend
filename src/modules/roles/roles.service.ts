import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        const candidate = await this.roleRepository.findOne({
            where: { roleId: dto.roleId },
        });
        if (candidate) {
            throw new HttpException(
                'Role already exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getRoleById(id: string) {
        const role = await this.roleRepository.findOne({
            where: { roleId: id },
        });
        return role;
    }

    async getAll() {
        const roles = await this.roleRepository.findAll();
        return roles;
    }
}
