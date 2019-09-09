
import { Document } from 'mongoose';

export namespace ItemIAttribute {

  export interface Base {
  }

  export interface Item extends Document {
    id?: string;
    name: string;
    description?: string;
    version: number;
  }
}
