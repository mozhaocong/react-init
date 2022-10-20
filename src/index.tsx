import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css'
import { axiosInit, isTrue } from 'html-mzc-tool'

axiosInit({
  setConfigHeaders() {
    const data = localStorage.getItem('Authorization')
    return isTrue(data) ? { Authorization: data } : {}
  }
})

function appInit() {
  // axiosInit()
  // ReactDOM.render(<App />, document.getElementById('app'))
  ReactDOM.createRoot(document.getElementById('app')).render(<App />)
}

appInit()
