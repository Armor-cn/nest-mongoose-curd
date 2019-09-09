
import * as mongoose from 'mongoose';
const name = 'Item';
export const ItemSchema =
{
  name,
  schema: new mongoose.Schema({
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
  }),
};
ItemSchema.schema.index({
  name: 1,
}, {
  background: true,
  unique: true,
});