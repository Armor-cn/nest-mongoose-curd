import { Module } from '@nestjs/common';
import { AuthService } from '../services';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthController } from '../controllers';
import { ItemModule } from './item.module';

@Module({
  imports: [ItemModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
