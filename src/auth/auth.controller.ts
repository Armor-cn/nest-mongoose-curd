import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from 'src/user/types/payload';

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
        await this.authService.validateUser(userDTO.email, userDTO.password);
        const user = await this.userService.findByLogin(userDTO);
        const token = await this.authService.gteToken(user);
        return { user, token };
    }

    @ApiOperation({ title: '注册' })
    @Post('/register')
    async register(
        @Body() userDTO: CreateUserDto,
    ) {
        const user = await this.userService.create(userDTO);
        const token = await this.authService.gteToken(user);
        return {
            email: user.email,
            token: token
        }
    }
}