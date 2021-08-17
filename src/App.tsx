import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import LoginPage from "src/pages/Login"
import { useAuthorization } from "./contexts/AuthorizationContext"

function App(): JSX.Element {
  const { isAuthorized, loading } = useAuthorization()

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : !isAuthorized ? (
        <LoginPage />
      ) : (
        <Router>
          <h1>Authorized</h1>
          <Link to="/">dashboard</Link>
          <br />
          <Link to="/accounts">accounts</Link>
          <br />
          <Link to="/transactions">transactions</Link>
          <br />
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/">
                <h1>dashboard</h1>
              </Route>
              <Route path="/accounts">
                <h1>accounts</h1>
              </Route>
              <Route path="/transactions">
                <h1>transactions</h1>
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </>
  )
}

export default App
