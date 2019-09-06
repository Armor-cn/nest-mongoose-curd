import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest',{ useNewUrlParser: true }), 
  AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
