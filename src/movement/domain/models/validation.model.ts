export interface Movement {
    id: number
    date: Date
    label: string
    amount: number
}

export interface Balance {
    date: Date
    balance: number
}

export interface Reason {
    test: string
}