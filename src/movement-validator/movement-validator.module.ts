import { Module } from '@nestjs/common'
import { MovementValidatorServiceImpl } from './application/service/movement-validator.service'
import { MovementController } from './application/controller/movement-validator.controller'
import { MovementValidatorServiceToken } from './domain/service/movement-validator.service.Interface'


@Module({
  controllers: [MovementController],
  providers: [{provide: MovementValidatorServiceToken, useClass: MovementValidatorServiceImpl}],
})
export class MovementValidatorModule {}
