import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfileDto } from './dto/create-profile.dto';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';
import { User } from '../users/models/users.model';
import { Profile } from './models/profiles.model';
import { Op } from 'sequelize';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectModel(Profile) private profilesRepository: typeof Profile,
        @InjectModel(User) private usersRepository: typeof User,
    ) {}

    async createProfile(dto: CreateProfileDto) {
        const user = await this.usersRepository.findOne({
            where: { id: dto.userId },
        });

        if (user.profileId) {
            throw new HttpException(
                'User already have profile',
                HttpStatus.BAD_REQUEST,
            );
        }

        const createdProfile = await this.profilesRepository.create(dto);
        return createdProfile;
    }

    async getProfileById(id: string) {
        const profile = await this.profilesRepository.findOne({
            where: { id: id },
            include: { all: true },
        });
        if (profile) {
            return profile;
        }
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    async getProfileByUserId(id: string) {
        const user = await this.usersRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const profile = await this.profilesRepository.findOne({
            where: { id: user.profileId },
            include: { all: true },
        });
        if (profile) {
            return profile;
        }
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    async getProfilesList(page?: number, items?: number, searchQuery?: string) {
        const profiles = await this.profilesRepository.findAndCountAll({
            where: searchQuery && {
                [Op.or]: {
                    firstName: {
                        [Op.iLike]: `%${searchQuery}%`,
                    },
                    lastName: {
                        [Op.iLike]: `%${searchQuery}%`,
                    },
                    country: {
                        [Op.iLike]: `%${searchQuery}%`,
                    },
                    region: {
                        [Op.iLike]: `%${searchQuery}%`,
                    },
                },
            },
            limit: items ? items : 10,
            offset: items ? (page ? items * page : 0) : page ? page * 10 : 0,
            include: {
                model: User,
                attributes: ['email', 'banned', 'banReason'],
            },
        });
        return profiles;
    }

    async updateProfile(id: string, dto: CreateProfileDto) {
        const profile = await this.profilesRepository.findOne({
            where: { id: id },
        });

        if (profile) {
            profile.firstName = dto.firstName;
            profile.lastName = dto.lastName;
            profile.region = dto.region;
            profile.country = dto.country;
            profile.address = dto.address;
            profile.birthDate = dto.birthDate;

            await profile.save();
            return profile;
        }

        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    async deleteProfile(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
