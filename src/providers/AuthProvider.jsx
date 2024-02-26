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
  return authContext
}

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(data)
  const [user, setUser] = useState(null)
  const [isSignedIn, setIsSignedIn] = useState(null)

  const login = ({ username, password }) => {
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
    setUsers([...users, { userId: uuidv4(), username, email, password }])
  }

  const removeUser = (userId) => {
    const newUsersList = []
    users.forEach((user) => {
      if (user.userId !== userId) {
        newUsersList.push(user)
      }
    })
    setUsers(newUsersList)
  }

  const updateUser = (userId, { username, email, password }) => {
    console.log(userId, { username, email, password })

    const newUsersList = users.map((user) =>
      user.userId == userId
        ? {
            userId: user.userId,
            username,
            email,
            password
          }
        : user
    )
    setUsers(newUsersList)
  }

  return (
    <AuthContext.Provider
      value={{
        users,
        user,
        isSignedIn,
        login,
        logout,
        addUser,
        removeUser,
        updateUser
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
