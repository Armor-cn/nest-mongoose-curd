import { Module, Provider } from '@nestjs/common';
import * as Services from '../services';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ModelModule } from './model.module';

const services: Provider[] = [];
for (const key in Services) {
    services.push(Services[key]);
}
services.push(JwtStrategy);
@Module({
    imports:[ModelModule],
    providers: services,
    exports: services,
})
export class ServiceModule { }