import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './types/user';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    sanitizeUser(user: User) {
        // const sanitized = user.toObject();
        // delete sanitized.password;
        // return sanitized;
    }

    async create(userDTO: CreateUserDto) {
        const {email} = userDTO;
        const user = await this.userModel.findOne({email});
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        // return this.sanitizeUser(createdUser);
    }

    async findByLogin(userDTO: LoginUserDto) {
        const {email, password} = userDTO;
        const user = await this.userModel.findOne({email});
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (await bcrypt.compare(password, user.password)) {
            return ;
            // return this.sanitizeUser(user);
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    async findByPayload(payload: any) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
    }
}
