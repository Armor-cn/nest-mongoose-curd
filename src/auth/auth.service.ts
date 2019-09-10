import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByPayload(email);
        if (user && user.password === password) {
            const { password, ...result } = user;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            password: user.password
        }
        const access_token = sign(payload, 'secretKey', { expiresIn: '12h' });
        return {
            token: `Bearer ${access_token}`,
        };
    }


}
