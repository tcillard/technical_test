import { Body, Controller, Inject, Post } from "@nestjs/common"
import { MovementServiceInterface, MovementServiceToken } from "src/movementValidator/domain/service/movement.service.Interface"
import { ValidationControllerResponse, ValidationDto } from "src/movementValidator/infra/adapters/controller/validation.dto"

@Controller('movements')

export class MovementController {
    constructor(
        @Inject(MovementServiceToken)
        private movementService: MovementServiceInterface
    ) {}
    
    @Post('validation')
    private async validate(@Body() movementValidationRequest: ValidationDto): Promise<ValidationControllerResponse> {
        const response = await this.movementService.validate(movementValidationRequest.movements, movementValidationRequest.balances)
        return 
    }
}