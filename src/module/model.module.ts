import { Module } from '@nestjs/common';
import { MongodbService } from '../database/mongoose';
@Module({
    providers: [MongodbService],
    exports: [MongodbService],
})
export class ModelModule { }
