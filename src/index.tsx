import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { AuthorizationProvider } from "./contexts/AuthorizationContext"

ReactDOM.render(
  <React.StrictMode>
    <AuthorizationProvider>
      <App />
    </AuthorizationProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
