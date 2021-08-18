import React from "react"

export type AccountsProps = {
  setPage: (page: string) => void
}

const Accounts: React.FC<AccountsProps> = ({ setPage }: AccountsProps) => {
  setPage("accounts")

  return (
    <>
      <h1>accounts</h1>
      <p>accounts page</p>
    </>
  )
}

export default Accounts
