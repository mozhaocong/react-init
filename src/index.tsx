import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css'
import { axiosInit, isTrue } from 'html-mzc-tool'
import 'moment/locale/zh-cn'
import { Provider } from 'react-redux'
import store from '@/store/index'

axiosInit({
  setConfigHeaders() {
    const data = localStorage.getItem('Authorization')
    return isTrue(data) ? { Authorization: data } : {}
  }
})

function appInit() {
  // axiosInit()
  // ReactDOM.render(<App />, document.getElementById('app'))
  ReactDOM.createRoot(document.getElementById('app')).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

appInit()
