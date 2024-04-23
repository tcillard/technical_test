import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { Balance, Movement, Reason } from "src/movement-validator/domain/models/movement-validation.model";

export class ValidationDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Movement)
    movements: Array<Movement>
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Balance)
    balances: Array<Balance>
}

export type ValidationSuccess = {
    message: string
}

export type ValidationError = {
    message: string
    reasons: Reason[]
}