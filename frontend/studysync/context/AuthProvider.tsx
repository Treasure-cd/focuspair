"use client"

import { createContext, useContext } from "react"
import { User } from "@/app/types/userType"

type AuthContextType = {
  user: User | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
})

export function AuthProvider({ children, initialUser }: { children: React.ReactNode, initialUser: User | null }) {

  return (
    <AuthContext.Provider value={{ user: initialUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)