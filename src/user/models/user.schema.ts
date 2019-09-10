import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},{
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

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
        if (!this.isModified('password')) {
        return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});
