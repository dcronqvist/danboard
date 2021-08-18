import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import LoginPage from "src/pages/Login"
import { useAuth } from "./contexts/AuthorizationContext"
import Dashboard from "./pages/Dashboard"
import Accounts from "./pages/Accounts"
import { createGlobalStyle } from "styled-components"
import { Helmet } from "react-helmet"
import Layout from "./components/Layout"
import { useState } from "react"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }
`

function App(): JSX.Element {
  const { isAuthorized, loading } = useAuth()
  const [currentPage, setCurrentPage] = useState<string>("")

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <GlobalStyle />
      {loading ? (
        <div>Loading...</div>
      ) : !isAuthorized ? (
        <LoginPage />
      ) : (
        <Router>
          <Layout currentPage={currentPage}>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/">
                <Dashboard setPage={setCurrentPage} />
              </Route>
              <Route path="/accounts">
                <Accounts setPage={setCurrentPage} />
              </Route>
              <Route path="/transactions">
                <h1>transactions</h1>
              </Route>
            </Switch>
          </Layout>
        </Router>
      )}
    </>
  )
}

export default App
