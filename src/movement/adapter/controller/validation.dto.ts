import { Balance, Movement } from "src/movement/domain/models/validation.model";

export class ValidationDto {
    movements: Array<Movement>
    balances: Array<Balance>
}

export type ValidationSuccess = {
    message: "Accepted"
}

export type ValidationError = {
    message: "I'm a teapot"
    reasons: any[]
}

export type ValidationControllerResponse = ValidationSuccess | ValidationError