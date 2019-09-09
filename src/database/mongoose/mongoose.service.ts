import { Injectable } from '@nestjs/common';
import { UserSchema, ItemSchema } from '../schema';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { mongodb } from '../../common';
import { User ,Item } from '../../interface';
@Injectable()
export class MongodbService {
    public readonly user: Model<User>;
    public readonly Item: Model<Item>;
    constructor() {
        mongodb();
        this.user = mongoose.model<User>(UserSchema.name, UserSchema.schema);
        this.Item = mongoose.model<Item>(ItemSchema.name, ItemSchema.schema);
    }
}
