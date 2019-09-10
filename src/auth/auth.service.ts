import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import { Payload } from '../user/types/payload';

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

    async gteToken(user: Payload) {
        const payload = {
            email: user.email,
            password: user.password
        }
        const access_token = jwt.sign(payload, 'secretKey', { expiresIn: '12h' });
        return {
            token: `Bearer ${access_token}`,
        };
    }


}
