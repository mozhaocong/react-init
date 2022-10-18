import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css'
// import './global'
// import { axiosInit } from '@/http'

function appInit() {
  // axiosInit()
  // ReactDOM.render(<App />, document.getElementById('app'))
  ReactDOM.createRoot(document.getElementById('app')).render(<App />)
}

appInit()
