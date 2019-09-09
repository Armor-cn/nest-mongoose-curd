import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [UserModule, ItemsModule, PassportModule.register({
    defaultStrategy: 'jwt'
  }), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: '60s'
    },
  }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
