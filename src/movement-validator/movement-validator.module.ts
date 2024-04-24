import { Module } from '@nestjs/common'
import { MovementServiceImpl } from './application/service/movement-validator.service'
import { MovementController } from './application/controller/movement-validator.controller'
import { MovementServiceToken } from './domain/service/movement-validator.service.Interface'


@Module({
  controllers: [MovementController],
  providers: [{provide: MovementServiceToken, useClass: MovementServiceImpl}],
})
export class MovementValidatorModule {}
