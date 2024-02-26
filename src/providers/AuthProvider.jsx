import { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { users as data } from './../data/users.json'

const AuthContext = createContext({
  users: [],
  isSignedIn: false,
  currentUser: {
    userId: null,
    username: null,
    email: null,
    password: null
  }
})

export const useAuth = () => {
  const authContext = useContext(AuthContext)
  const [users, setUsers] = useState(data)
  const [user, setUser] = useState(authContext.currentUser)
  const [isSignedIn, setIsSignedIn] = useState(authContext.isSignedIn)

  const login = ({ username, password }) => {
    console.log(users)
    const user = users.find(
      (user) => user.username === username && user.password === password
    )
    if (user) {
      setUser(user)
      setIsSignedIn(true)
      return user
    } else {
      throw new Error('Identifiants incorrects')
    }
  }

  const logout = () => {
    setUser({
      username: null,
      email: null,
      password: null
    })
    setIsSignedIn(false)
  }

  const addUser = ({ username, email, password }) => {
    users.push({ userId: uuidv4(), username, email, password })
  }

  const removeUser = (userId) => {
    setUsers(users.filter((user) => user.userId !== userId))
  }

  const updateUser = (userId, { username, email, password }) => {
    setUsers(
      users.map((user) =>
        user.userId !== userId
          ? user
          : {
              username: username ?? user.username,
              email: email ?? user.email,
              password: password ?? user.password
            }
      )
    )
  }

  return {
    user,
    login,
    logout,
    addUser,
    removeUser,
    updateUser,
    isSignedIn
  }
}

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
