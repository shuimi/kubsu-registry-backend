import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotImplementedException } from '../../shared/exceptions/not-implemented.exception';
import { CreateJournalRepresentativeDto } from './dto/create-journal-representative.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/models/users.model';
import { JournalRepresentativeProfile } from './models/journal-representative-profile.model';
import { Op } from 'sequelize';

@Injectable()
export class JournalRepresentativeService {
    constructor(
        @InjectModel(JournalRepresentativeProfile)
        private profilesRepository: typeof JournalRepresentativeProfile,
        @InjectModel(User) private usersRepository: typeof User,
    ) {}

    async createProfile(dto: CreateJournalRepresentativeDto) {
        const user = await this.usersRepository.findOne({
            where: { id: dto.userId },
        });

        if (user.profileId) {
            throw new HttpException(
                'User already have journal representative profile',
                HttpStatus.BAD_REQUEST,
            );
        }

        const createdProfile = await this.profilesRepository.create(dto);
        return createdProfile;
    }

    async getProfilesList(page: number, items: number, searchQuery: string) {
        const profiles = await this.profilesRepository.findAndCountAll({
            where: searchQuery && {
                [Op.or]: {
                    governmentId: {
                        [Op.iLike]: `%${searchQuery}%`,
                    },
                    representedLegalEntity: {
                        [Op.iLike]: `%${searchQuery}%`,
                    },
                    legalEntityPhoneNumber: {
                        [Op.iLike]: `%${searchQuery}%`,
                    },
                    legalEntityEmail: {
                        [Op.iLike]: `%${searchQuery}%`,
                    },
                    phoneNumber: {
                        [Op.iLike]: `%${searchQuery}%`,
                    },
                },
            },
            limit: items ? items : 10,
            offset: items ? (page ? items * page : 0) : page ? page * 10 : 0,
            include: { all: true },
        });
        return profiles;
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

    async updateProfile(id: string, dto: CreateJournalRepresentativeDto) {
        const profile = await this.profilesRepository.findOne({
            where: { id: id },
        });

        if (profile) {
            profile.identityDocumentLink = dto.identityDocumentLink;
            profile.governmentId = dto.governmentId;
            profile.representedLegalEntity = dto.representedLegalEntity;
            profile.legalEntityPhoneNumber = dto.legalEntityPhoneNumber;
            profile.legalEntityEmail = dto.legalEntityEmail;
            profile.phoneNumber = dto.phoneNumber;
            profile.userId = dto.userId;

            await profile.save();
            return profile;
        }

        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    async deleteProfile(id: string) {
        throw new NotImplementedException({ message: 'Not implemented' });
    }
}
