import { useQuery } from "@apollo/client"
import React from "react"
import {
  GET_PERIOD,
  GET_PERIOD_DATA,
  GET_PERIOD_VARS,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_DATA,
  GET_TRANSACTIONS_VARS,
} from "src/model/queries"
import styled from "styled-components"

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
      month: [7],
    },
  })
  const transactions = useQuery<GET_TRANSACTIONS_DATA, GET_TRANSACTIONS_VARS>(
    GET_TRANSACTIONS,
    {
      variables: {
        startDate: currentPeriod.data?.periods[0].startTimestamp,
        endDate: currentPeriod.data?.periods[0].endTimestamp,
      },
    }
  )

  console.log(transactions.data)

  return (
    <Wrapper>
      <DashbardItem title={"income this period"} x={1} y={1} w={1} h={1}>
        <DashbordItemAmount>12 842 kr</DashbordItemAmount>
      </DashbardItem>
      <DashbardItem title={"expenses this period"} x={2} y={1} w={1} h={1}>
        {transactions.data?.transactions.reduce((acc, cur) => {
          return acc + (cur.fromAccount.number === 101 ? cur.amount : 0)
        }, 0)}
      </DashbardItem>
    </Wrapper>
  )
}

export default Dashboard
