import { Injectable } from '@nestjs/common';
import { UserSchema, ItemSchema } from '../schema';
import { ItemIAttribute, UserIAttribute } from '../../interface';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { mongodb } from '../../common';
@Injectable()
export class MongodbService {
    public readonly user: Model<UserIAttribute.User>;
    public readonly Item: Model<ItemIAttribute.Item>;
    constructor() {
        mongodb();
        this.user = mongoose.model<UserIAttribute.User>(UserSchema.name, UserSchema.schema);
        this.Item = mongoose.model<ItemIAttribute.Item>(ItemSchema.name, ItemSchema.schema);
    }
}
