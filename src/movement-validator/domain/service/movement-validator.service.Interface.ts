import { Balance, Movement, Reason } from "../models/movement-validation.model";

export interface MovementValidatorServiceInterface {
    validate(movements: Array<Movement>, balances: Array<Balance>): Array<Reason>
}

export const MovementValidatorServiceToken  = "MovementValidatorServiceToken"