import { Module } from '@nestjs/common';
import { ItemsService } from '../services';
import { ItemsController } from '../controllers';

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemModule {}
