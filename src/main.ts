import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as util from 'util';
import { Config } from './common/config.common';
declare const module: any;


// 原生方法注入
const console_log = console.log;
console.log = (...objs: any[]): void => {
    for (const obj of objs) {
        // Logger.log(JSON.stringify(obj));
        console_log(`[${new Date().toLocaleString()}] - `, obj);
    }
};
console.debug = (...objs: any[]): void => {
    for (const obj of objs) {
        console.log(util.inspect(obj, true, 8, true));
    }
};

const port = Number(Config.getOrThrow('server.port'));
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('blog 博客接口文档')
    .setDescription('The cats API description')
    .setVersion('2.0')
    .addBearerAuth('/')
    .addTag('blog')
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => console.log( `Nest application  successfully started http://localhost:${port}/`));
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
