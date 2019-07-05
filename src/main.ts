import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config } from './../config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT);
}
bootstrap()
  .then(() => {
    // tslint:disable-next-line: no-console
    console.log(`Application is listening on port ${config.PORT}`);
  })
  .catch(err => {
    // tslint:disable-next-line: no-console
    console.error(err);
  });
