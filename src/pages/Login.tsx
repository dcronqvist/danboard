import { Helmet } from "react-helmet"
import React, { useState } from "react"
import { useAuth } from "src/contexts/AuthorizationContext"

const LoginPage = (): JSX.Element => {
  const { performLogin } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <input
        value={username}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => performLogin(username, password)}>login</button>
    </div>
  )
}

export default LoginPage
