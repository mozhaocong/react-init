import React from 'react'
import style from './index.module.less'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className={style.layout}>
      <Outlet />
    </div>
  )
}

export default Home
