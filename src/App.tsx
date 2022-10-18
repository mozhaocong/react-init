// @ts-ignore
import React, { useEffect } from 'react'
import routes from '@/routes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Interceptor } from '@/routes/test'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { isTrue } from 'html-mzc-tool'

const App = () => {
  function setRouter() {
    return routes.map((item: any, index: any) => {
      return (
        <Route
          key={index}
          path={item.path}
          element={<Interceptor route={item} />}
        >
          {isTrue(item.children) &&
            item.children.map((res: any, childIndex: number) => {
              return (
                <Route
                  path={res.path}
                  key={childIndex}
                  element={<Interceptor route={res} />}
                />
              )
            })}
        </Route>
      )
    })
  }

  return (
    // @ts-ignore
    <ConfigProvider locale={zhCN}>
      <BrowserRouter
        /*@ts-ignore*/
        basename={window?.__MICRO_APP_BASE_ROUTE__ || '/admin-ht-child'}
      >
        <Routes>{setRouter()}</Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
