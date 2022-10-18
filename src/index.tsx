import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
// import './global'
// import { axiosInit } from '@/http'
// import '@/assets/css/admin/index.less'
// import '@/assets/css/admin/antd.less'

// 微前端
// import './public-path'
// import { store } from '@/store'
// import { Provider } from 'react-redux'

function appInit() {
  // axiosInit()
  ReactDOM.render(<App />, document.getElementById('app'))
}

appInit()
