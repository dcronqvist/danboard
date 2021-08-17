import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
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
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch></Switch>
            <h1>Authorized</h1>
          </div>
        </Router>
      )}
    </>
  )
}

export default App
