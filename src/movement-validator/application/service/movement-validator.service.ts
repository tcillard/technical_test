import { Injectable } from "@nestjs/common"
import { Balance, Movement, Reason } from "src/movement-validator/domain/models/movement-validation.model"
import { MovementValidatorServiceInterface } from "src/movement-validator/domain/service/movement-validator.service.Interface"

@Injectable()
export class MovementValidatorServiceImpl implements MovementValidatorServiceInterface {

    private isDeepEqual(movementToCheck: Movement, movement: Movement): boolean {
        if (movementToCheck.date.valueOf() === movement.date.valueOf()
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

    private someOfMovements(movements: Array<Movement>): number {
        let total: number = 0
        for (const movement of movements) {
            total += movement.amount
        }
        return total
    }

    private checkSumOfMovements(movements: Array<Movement>, balances: Array<Balance>): Array<Reason> {
        const reasons: Array<Reason> = []
        for (let index = 1; index < balances.length; index++) {
            const movementsBetweenBalances = movements.filter((movement) => {
                return movement.date.valueOf() > balances[index - 1].date.valueOf()
                    && movement.date.valueOf() <= balances[index].date.valueOf()
            })
            const total = this.someOfMovements(movementsBetweenBalances) + balances[index - 1].balance
            if (total != balances[index].balance) {
                reasons.push(
                {
                    type: 'movement',
                    description: `bad sum of movement between ${balances[index - 1].date.toISOString()} and ${balances[index].date.toISOString()}`
                                    + `expected: ${total}, real: ${balances[index].balance}`,
                    objectInError: movementsBetweenBalances
                })
                }
            }
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