import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { Payload } from '../user/types/payload';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

@ApiUseTags('登录-注册模块')
@Controller('/auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService) { }
    @ApiOperation({ title: '测试' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
    tempAuth() {
        return { auth: 'works' };
    }


    @ApiOperation({ title: '登录' })
    @Post('login')
    async login(
        @Body() userDTO: LoginUserDto,
    ) {
        const user = await this.userService.findByLogin(userDTO, this.getIp('127.0.0.1'));
        const payload: Payload = {
            email: user.email,
            password: user.password,
        };
        const token = await this.authService.login(payload);
        return { user, token };
    }

    private getIp(node_ip: string) {
        if (node_ip.substr(0, 7) === '::ffff:') {
            return node_ip.substr(7);
        }
        return node_ip;
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
