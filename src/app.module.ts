import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { MovementModule } from './movement-validator/movement.module'
import 'dotenv/config'

@Module({
  imports: [
    MovementModule,
  ],
  providers: [AppService],
  
})
export class AppModule {}
