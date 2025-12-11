import { Module } from '@nestjs/common';
import { ToysService } from './toys.service';
import { ToysController } from './toys.controller';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ToysController],
  providers: [ToysService],
})
export class ToysModule {}
