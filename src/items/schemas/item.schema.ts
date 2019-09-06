
import * as mongoose from 'mongoose';
export const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    default: 'About information'
  },
  description: {
    require: true,
    type: String
  },
  version: String,
}, {
  timestamps: true,
  toObject: {
    transform(doc, ret, game) {
      delete ret.__v;
      delete ret._id;
    },
    virtuals: true,
  },
  toJSON: {
    transform(doc, ret, game) {
      delete ret.__v;
      delete ret._id;
    },
    virtuals: true,
  },
  id: true,
  versionKey: false,
});

ItemSchema.index({
  name: 1,
}, {
  background: true,
  unique: true,
});