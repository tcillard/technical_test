import { Injectable } from "@nestjs/common";
import { Balance, Movement, Reason } from "src/movementValidator/domain/models/validation.model";
import { MovementServiceInterface } from "src/movementValidator/domain/service/movement.service.Interface";

@Injectable()
export class MovementServiceImpl implements MovementServiceInterface {
    public async validate(movements: Array<Movement>, balances: Array<Balance>): Promise<Array<Reason>> {
        console.log(movements)
        console.log(balances)
        return []
    }
}