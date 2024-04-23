import { Module } from '@nestjs/common'
import { MovementServiceImpl } from './application/service/movement.service'
import { MovementController } from './application/controller/movement.controller'
import { MovementServiceToken } from './domain/service/movement.service.Interface'


@Module({
  controllers: [MovementController],
  providers: [{provide: MovementServiceToken, useClass: MovementServiceImpl}],
})
export class MovementModule {}
