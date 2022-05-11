import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {}
