import { useQuery } from "@apollo/client"
import React from "react"
import {
  GET_FROM_TO,
  GET_FROM_TO_DATA,
  GET_FROM_TO_VARS,
  GET_PERIOD,
  GET_PERIOD_DATA,
  GET_PERIOD_VARS,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_DATA,
  GET_TRANSACTIONS_VARS,
} from "src/model/queries"
import styled from "styled-components"
import DashboardItemTag from "src/components/DashboardItemTag"

const Wrapper = styled.div`
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  padding: 15px;
`

const GridItem = styled.div<{ x: number; y: number; w: number; h: number }>`
  grid-column-start: ${(props) => props.x};
  grid-column-end: ${(props) => props.x + props.w};
  grid-row-start: ${(props) => props.y};
  grid-row-end: ${(props) => props.y + props.h};
  border: 1px solid #e1e1e1;
  border-radius: 14px;
  margin: 15px;
  padding: 20px;

  & > h2 {
    color: #6d6d6d;
    font-size: 14px;
    margin: 0px;
    padding: 0px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`

const DashbordItemAmount = styled.p`
  color: black;
  font-size: 36px;
  font-weight: 600;
  margin: 0px;
`

export type DashboardItemProps = {
  title: string
  x: number
  y: number
  w: number
  h: number
  children: any
}

const DashbardItem: React.FC<DashboardItemProps> = ({
  title,
  x,
  y,
  w,
  h,
  children,
}: DashboardItemProps) => {
  return (
    <GridItem x={x} y={y} w={w} h={h}>
      <h2>{title}</h2>
      <div>{children}</div>
    </GridItem>
  )
}

export type DashboardProps = {
  setPage: (page: string) => void
}

const Dashboard: React.FC<DashboardProps> = ({ setPage }: DashboardProps) => {
  setPage("dashboard")
  const currentPeriod = useQuery<GET_PERIOD_DATA, GET_PERIOD_VARS>(GET_PERIOD, {
    variables: {
      year: [2020],
      month: [11],
    },
  })
  const previousPeriod = useQuery<GET_PERIOD_DATA, GET_PERIOD_VARS>(
    GET_PERIOD,
    {
      variables: {
        year: [2020],
        month: [10],
      },
    }
  )
  const transactions = useQuery<GET_TRANSACTIONS_DATA, GET_TRANSACTIONS_VARS>(
    GET_TRANSACTIONS,
    {
      variables: {
        startDate: currentPeriod.data?.periods[0].startTimestamp,
        endDate: currentPeriod.data?.periods[0].endTimestamp,
      },
    }
  )
  const transactionsPreviousPeriod = useQuery<
    GET_TRANSACTIONS_DATA,
    GET_TRANSACTIONS_VARS
  >(GET_TRANSACTIONS, {
    variables: {
      startDate: previousPeriod.data?.periods[0].startTimestamp,
      endDate: previousPeriod.data?.periods[0].endTimestamp,
    },
  })
  const totalIncomes = useQuery<GET_FROM_TO_DATA, GET_FROM_TO_VARS>(
    GET_FROM_TO,
    {
      variables: {
        toAccount: {
          number: 101,
        },
      },
    }
  )
  const totalExpenses = useQuery<GET_FROM_TO_DATA, GET_FROM_TO_VARS>(
    GET_FROM_TO,
    {
      variables: {
        fromAccount: {
          number: 101,
        },
      },
    }
  )

  const expenses = (transactions: GET_TRANSACTIONS_DATA) => {
    return transactions.transactions
      .filter((transaction) => transaction.fromAccount.number === 101)
      .reduce((acc, cur) => {
        return acc + cur.amount
      }, 0)
  }

  const incomes = (transactions: GET_TRANSACTIONS_DATA) => {
    return transactions.transactions
      .filter((transaction) => transaction.toAccount.number === 101)
      .reduce((acc, cur) => {
        return acc + cur.amount
      }, 0)
  }

  const savings = (transactions: GET_TRANSACTIONS_DATA) => {
    return transactions.transactions
      .filter((transaction) => transaction.toAccount.number in [102, 103])
      .reduce((acc, cur) => {
        return acc + cur.amount
      }, 0)
  }

  const currentPreviousIncomeDiff: number | undefined =
    transactions.data && transactionsPreviousPeriod.data
      ? incomes(transactions.data) - incomes(transactionsPreviousPeriod.data)
      : undefined

  const currentPreviousIncomeDiffPrefix = currentPreviousIncomeDiff
    ? currentPreviousIncomeDiff > 0
      ? "+"
      : "-"
    : ""

  const incomeTagText = `${currentPreviousIncomeDiffPrefix}${
    currentPreviousIncomeDiff ? currentPreviousIncomeDiff : "loading..."
  } kr`

  const currentPreviousExpensesDiff: number | undefined =
    transactions.data && transactionsPreviousPeriod.data
      ? expenses(transactions.data) - expenses(transactionsPreviousPeriod.data)
      : undefined

  const currentPreviousExpensesDiffPrefix = currentPreviousExpensesDiff
    ? currentPreviousExpensesDiff > 0
      ? "+"
      : ""
    : ""

  const expensesTagText = `${currentPreviousExpensesDiffPrefix}${
    currentPreviousExpensesDiff
      ? Math.round(currentPreviousExpensesDiff)
      : "loading..."
  } kr`

  return (
    <Wrapper>
      <DashbardItem title={"income this period"} x={1} y={1} w={1} h={1}>
        <DashbordItemAmount>
          {transactions.data
            ? `${Math.round(incomes(transactions.data))} kr`
            : "loading..."}
        </DashbordItemAmount>
        <DashboardItemTag
          color={currentPreviousIncomeDiffPrefix == "+" ? "#33C300" : "#D73400"}
          icon="ic:outline-arrow-right-alt"
          iconTransform={
            currentPreviousIncomeDiffPrefix == "+"
              ? "rotate(-45deg)"
              : "rotate(45deg)"
          }
          text={incomeTagText}
        />
      </DashbardItem>
      <DashbardItem title={"expenses this period"} x={2} y={1} w={1} h={1}>
        <DashbordItemAmount>
          {transactions.data
            ? `${Math.round(expenses(transactions.data))} kr`
            : "loading..."}
        </DashbordItemAmount>
        <DashboardItemTag
          color={
            currentPreviousExpensesDiffPrefix == "+" ? "#33C300" : "#D73400"
          }
          icon="ic:outline-arrow-right-alt"
          iconTransform={
            currentPreviousExpensesDiffPrefix == "+"
              ? "rotate(-45deg)"
              : "rotate(45deg)"
          }
          text={expensesTagText}
        />
      </DashbardItem>
      <DashbardItem title={"savings this period"} x={1} y={2} w={1} h={1}>
        <DashbordItemAmount>
          {transactions.data
            ? `${Math.round(savings(transactions.data))} kr`
            : "loading..."}
        </DashbordItemAmount>
      </DashbardItem>
      <DashbardItem title={"total income"} x={1} y={3} w={1} h={1}>
        <DashbordItemAmount>
          {totalIncomes.data
            ? `${Math.round(totalIncomes.data?.fromTo.amount / 100) / 10} Kkr`
            : "loading..."}
        </DashbordItemAmount>
      </DashbardItem>
      <DashbardItem title={"total expenses"} x={1} y={4} w={1} h={1}>
        <DashbordItemAmount>
          {totalExpenses.data
            ? `${Math.round(totalExpenses.data?.fromTo.amount / 100) / 10} Kkr`
            : "loading..."}
        </DashbordItemAmount>
      </DashbardItem>
    </Wrapper>
  )
}

export default Dashboard
