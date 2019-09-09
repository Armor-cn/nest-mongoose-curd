import {
    Module,
    Type,
} from '@nestjs/common';

import * as Controllers from '../controllers';
import { ServiceModule } from './service.module';

const controllers: Type<any>[] = [];
for (const key in Controllers) {
    controllers.push(Controllers[key]);
}
@Module({
    imports: [ServiceModule],
    controllers,
})
export class ControllerModule { }