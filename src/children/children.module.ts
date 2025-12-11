import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { DatabaseModule } from '@/database/database.module';
import { ToysModule } from '@/toys/toys.module';

@Module({
  imports: [DatabaseModule, ToysModule],
  controllers: [ChildrenController],
  providers: [ChildrenService],
})
export class ChildrenModule {}
