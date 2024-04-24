import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { MovementValidatorModule } from './movement-validator/movement-validator.module'
import 'dotenv/config'

@Module({
  imports: [
    MovementValidatorModule,
  ],
  providers: [AppService],
  
})
export class AppModule {}
