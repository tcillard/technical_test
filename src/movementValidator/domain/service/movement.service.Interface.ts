import { Balance, Movement, Reason } from "../models/validation.model";

export interface MovementServiceInterface {
    validate(movements: Array<Movement>, balances: Array<Balance>): Promise<Array<Reason>>
}

export const MovementServiceToken  = "MovementServiceToken"