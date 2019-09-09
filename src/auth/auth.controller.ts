import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from '../user/types/payload';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
@ApiUseTags('登录-注册模块')
@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService) { }

    @Get()
    tempAuth() {
        return { auth: 'works' };
    }
    @ApiOperation({ title: '登录' })
    @Post('login')
    async login(@Body() userDTO: LoginUserDto) {
        const user = await this.userService.findByLogin(userDTO);
        const payload: Payload = {
            email: user.email,
            password: user.password,
        };
        const token = await this.authService.login(payload);
        console.log(token)
        return { user, token:`Bearer ${token.access_token}` };
    }

    @ApiOperation({ title: '注册' })
    @Post('register')
    async register(@Body() userDTO: CreateUserDto) {
        const user = await this.userService.create(userDTO);
        const payload: Payload = {
            email: user.email,
            password: user.password
        };
        const token = await this.authService.login(payload);
        return { user, token };
    }
}
