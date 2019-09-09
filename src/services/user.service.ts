import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserIAttribute } from '../interface/user.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { LoginUserDto } from '../dto/login.user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserIAttribute.User>) { }

    sanitizeUser(user: UserIAttribute.User) {
        user.password = ''
        // delete user.password;
        return user;
    }

    async create(userDto: CreateUserDto) {
        const { email } = userDto;
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new HttpException('用户名已经存在', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.userModel(userDto);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async findByLogin(userDTO: LoginUserDto) {
        const { email, password } = userDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);

        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    async findByPayload(payload: any) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
    }
}
