import React from 'react'
import './index.less'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  )
}

export default Home
