import { Module } from '@nestjs/common';
import { ModelModule } from './model.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [ModelModule, AuthModule],
})
export class AppModule { }
