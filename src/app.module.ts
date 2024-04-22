import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { MovementModule } from './movementValidator/movementValidator.module'

export const AppServiceToken  = "AppServiceToken"

@Module({
  imports: [MovementModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
