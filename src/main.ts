import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as util from 'util';
import { LoggerMiddleware } from './logger/logger.middleware';
import * as BodyParser from 'body-parser';
import { AnyExceptionFilter } from './filter/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as CookieParser from 'cookie-parser';
declare const module: any;


// 原生方法注入
const console_log = console.log;
console.log = (...objs: any[]): void => {
  for (const obj of objs) {
    console_log(`[${new Date().toLocaleString()}] - `, obj);
  }
};
console.debug = (...objs: any[]): void => {
  for (const obj of objs) {
    console.log(util.inspect(obj, true, 8, true));
  }
};

async function bootstrap() {
  const port = Number(4000);
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AnyExceptionFilter())
  app.enableCors();
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
  app.use(BodyParser.urlencoded({ limit: '2mb', extended: false }));
  app.use(BodyParser.json({ limit: '2mb' }));
  app.useGlobalPipes(new ValidationPipe());
  app.use(LoggerMiddleware);


  await app.listen(port, () =>
    console.log(`Nest application  successfully started http://localhost:${port}/`));
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
}
bootstrap();
