"use client"

import { createContext, useContext, useState } from "react"
import { User } from "@/app/types/userType"

type AuthContextType = {
  user: User | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
})

export function AuthProvider({ children, initialUser }: { children: React.ReactNode, initialUser: User | null }) {
  const [user, setUser] = useState<User | null>(initialUser);


  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)