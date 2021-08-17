import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import React from "react"

type AuthorizationContextType = {
  isAuthorized: boolean
  accessToken: string
  performLogin: (username: string, password: string) => void
  loading: boolean
}

const authorizationContextDefaultValues: AuthorizationContextType = {
  isAuthorized: false,
  accessToken: "",
  performLogin: () => {
    return undefined
  },
  loading: true,
}

const AuthorizationContext = createContext<AuthorizationContextType>(
  authorizationContextDefaultValues
)

export function useAuthorization(): AuthorizationContextType {
  return useContext(AuthorizationContext)
}

export const AuthorizationProvider = ({
  children,
}: {
  children: JSX.Element
}): JSX.Element => {
  const [isAuthorized, setIsAuthorized] = useState(
    authorizationContextDefaultValues.isAuthorized
  )
  const [accessToken, setAccessToken] = useState(
    authorizationContextDefaultValues.accessToken
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token")

    if (storedToken) {
      setAccessToken(storedToken)

      axios
        .get("https://api.dcronqvist.se/v1/auth/checktoken", {
          headers: {
            Authorization: `${storedToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsAuthorized(true)
            setLoading(false)
          } else {
            setIsAuthorized(false)
            setLoading(false)
          }
        })
        .catch(() => {
          setIsAuthorized(false)
          setLoading(false)
        })
    } else {
      setIsAuthorized(false)
      setLoading(false)
      setAccessToken("")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("access_token", accessToken)
  }, [accessToken])

  const performLogin = (username: string, password: string) => {
    axios
      .post("https://api.dcronqvist.se/v1/auth/login", {
        username,
        password,
      })
      .then((response) => {
        console.log(response)

        if (response.status === 200) {
          localStorage.setItem("access_token", response.data.token.token)
          setAccessToken(response.data.token.token)
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      })
      .catch(() => {
        setIsAuthorized(false)
      })
  }

  const value: AuthorizationContextType = {
    isAuthorized: isAuthorized,
    accessToken: accessToken,
    performLogin: performLogin,
    loading: loading,
  }

  return (
    <>
      <AuthorizationContext.Provider value={value}>
        {children}
      </AuthorizationContext.Provider>
    </>
  )
}
