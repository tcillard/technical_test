import { Body, Controller, Inject, Post, Res } from "@nestjs/common"
import { MovementServiceInterface, MovementServiceToken } from "src/movement-validator/domain/service/movement-validator.service.Interface"
import { ValidationDto, ValidationError, ValidationSuccess } from "src/movement-validator/adapter/controller/movement-validation.dto"
import { Response } from 'express'
import { Reason } from "src/movement-validator/domain/models/movement-validation.model"

@Controller('movements')

export class MovementController {
    constructor(
        @Inject(MovementServiceToken)
        private movementService: MovementServiceInterface
    ) {}
    
    @Post('validation')
    private async create(
        @Body() movementValidationRequest: ValidationDto,
        @Res() res: Response
    ): Promise<void> {
        const reasons: Array<Reason> = this.movementService.validate(movementValidationRequest.movements, movementValidationRequest.balances)
        if (reasons.length > 0) {
            res.status(418).json({message: "I’m a teapot", reasons: reasons} as ValidationError).send()
        } else {
            res.status(202).json({message: 'Accepted'} as ValidationSuccess).send()
        }
    }
}