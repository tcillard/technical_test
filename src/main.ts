import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('Bootstrap')
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  await app.listen(process.env.application_port)
  logger.log('Application listen on port ' + process.env.application_port)
}
bootstrap()
