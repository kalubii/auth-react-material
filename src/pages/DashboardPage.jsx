import React from 'react'
import UsersList from '../components/UsersList'
import ResponsiveAppBar from './../components/ResponsiveAppBar'

const DashboardPage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <h1>Dashboard</h1>
      <UsersList />
    </>
  )
}

export default DashboardPage
