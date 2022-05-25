import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [RequestsController],
    providers: [RequestsService],
    imports: [AuthModule],
})
export class RequestsModule {}
