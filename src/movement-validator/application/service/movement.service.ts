import { Injectable } from "@nestjs/common"
import { Balance, Movement, Reason } from "src/movement-validator/domain/models/movement-validation.model"
import { MovementServiceInterface } from "src/movement-validator/domain/service/movement.service.Interface"

@Injectable()
export class MovementServiceImpl implements MovementServiceInterface {

    private isDeepEqual(movementToCheck: Movement, movement: Movement): boolean {
        if (movementToCheck.date === movement.date
                && movementToCheck.amount === movement.amount
                && movementToCheck.label === movement.label) {
            return true
        }
        return false
    }

    private isNotDuplicate(movementToCheck: Movement, movements: Array<Movement>): boolean {
        for (const movement of movements) {
            if (this.isDeepEqual(movementToCheck, movement)) {
                return false
            }
        }
        return true
    }

    private removeDuplicates(movements: Array<Movement>): Array<Movement> {
        const movementsCopy = Array.from(movements)
        const movementsWithoutDouble: Array<Movement> = []
        while (movementsCopy.length > 1) {
            const movementToCheck = movementsCopy.shift()
            if (this.isNotDuplicate(movementToCheck, movementsCopy)) {
                movementsWithoutDouble.push(movementToCheck)
            }
        }
        movementsWithoutDouble.push(movementsCopy[0])
        return movementsWithoutDouble
    }

    private removeDuplicatesAndSortMovements(movements: Array<Movement>): Array<Movement> {
        const movementsWithoutDouble = this.removeDuplicates(movements)
        return movementsWithoutDouble.sort((a, b) => {
            return a.date.valueOf() - b.date.valueOf()
        })
    }

    private checkBalances(balances: Array<Balance>): Array<Reason> {
        let index = 0
        const reasons: Array<Reason> = []
        if (balances.length < 2) {
            return [
                {
                    type: 'balance',
                    description: 'Not enough of balance. The minimum is 2 balances',
                    objectInError: balances
                }
            ]
        }
        while (index + 1 < balances.length) {
            if (balances[index].date.valueOf() > balances[index + 1].date.valueOf()){
                reasons.push({
                type: 'balance',
                description: 'two control points are not incremental',
                objectInError: [balances[index], balances[index + 1]]
               })
            }
            index++
        }
        return reasons
    }

    private checkSumOfMovements(movements: Array<Movement>, balances: Array<Balance>): Array<Reason> {
        const reasons: Array<Reason> = []
        const lastBalance: Balance = balances[0]
        
        
        return reasons
    }


    public validate(movements: Array<Movement>, balances: Array<Balance>): Array<Reason> {
        const movementsSortedAndWithoutDouble = this.removeDuplicatesAndSortMovements(movements)
        const balanceErrors = this.checkBalances(balances)
        if (balanceErrors.length > 0) {
            return balanceErrors
        }
        return this.checkSumOfMovements(movementsSortedAndWithoutDouble, balances)
    }
}