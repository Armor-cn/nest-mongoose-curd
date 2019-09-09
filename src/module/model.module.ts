import { Module } from '@nestjs/common';
import { MongodbService } from '../database/mongoose';
@Module({
    imports:[MongodbService],
    providers: [MongodbService],
    exports: [MongodbService],
})
export class ModelModule { }
