import { Type } from "class-transformer"
import { IsDate, IsNumber, IsString } from "class-validator"

export class Movement {
    @IsNumber()
    id: number
    @IsDate()
    @Type(() => Date)
    date: Date
    @IsString()
    label: string
    @IsNumber()
    amount: number
}

export class Balance {
    @IsDate()
    @Type(() => Date)
    date: Date
    @IsNumber()
    balance: number
}


export type BalanceReason = {
    type: "balance"
    description: string
    objectInError: Array<Balance>
}

export type MovementReason = {
    type: "movement"
    description: string
    gap: number
}

export type Reason =  BalanceReason | MovementReason