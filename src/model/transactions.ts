import { Account } from "./accounts";

export type Transaction = {
    dateReg: number,
    dateTrans: number,
    amount: number,
    desc: string,
    fromAccount: Account,
    toAccount: Account,
    user: string
}