import { Document } from 'mongoose';

export namespace UserIAttribute {

    export interface Base {
    }

    export interface User extends Document {
        email: string;
        password: string;
    }
}
