import { Balance, Movement, Reason } from "../models/movement-validation.model";

export interface MovementServiceInterface {
    validate(movements: Array<Movement>, balances: Array<Balance>): Array<Reason>
}

export const MovementServiceToken  = "MovementServiceToken"