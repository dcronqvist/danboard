import { gql } from '@apollo/client';
import { Period } from './periods';
import { Transaction } from './transactions';

// --------------------------------------------------

export type GET_PERIOD_DATA = {
  periods: Period[]
}

export type GET_PERIOD_VARS = {
  year: number[],
  month: number[],
}

export const GET_PERIOD = gql`
  query CurrentPeriod($year: [Int], $month: [Int]) {
    periods(year: $year, month: $month) {
      month
      year
      start
      end
      startTimestamp
      endTimestamp
    }
  }
`

// --------------------------------------------------

export type GET_TRANSACTIONS_DATA = {
  transactions: Transaction[]
}

export type GET_TRANSACTIONS_VARS = {
  startDate?: number,
  endDate?: number,
  amount?: number,
  desc?: string,
  fromAccount?: { 
    number?: number
  },
  toAccount?: {
    number?: number
  }
}

export const GET_TRANSACTIONS = gql`
  query GetTransactions($startDate: Int, $endDate: Int) {
    transactions(startDate: $startDate, endDate: $endDate) {
      dateReg
      dateTrans
      amount
      desc
      user
      fromAccount {
        Id
        user
        name
        desc
        number
      }
      toAccount {
        Id
        user
        name
        desc
        number
      }
    }
  }
`

// ----------------------------------------------

export type GET_FROM_TO_DATA = {
  fromTo: {
    amount: number,
    amountOfTransactions: number,
  }
}

export type GET_FROM_TO_VARS = {
  fromAccount?: {
    number: number
  }

  toAccount?: {
    number: number
  }
}

export const GET_FROM_TO = gql`
  query GetFromTo($fromAccount: AccountInput, $toAccount: AccountInput) {
    fromTo(fromAccount: $fromAccount, toAccount: $toAccount) {
      amount
      amountOfTransactions
    }
  }
`