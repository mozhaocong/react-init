// @ts-ignore
import React, { useEffect } from 'react'
import routes from '@/routes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { isTrue } from 'html-mzc-tool'

export function Interceptor(pros) {
  const { route } = pros
  const RenderCom = route.component
  return <RenderCom route={route} />
}

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
      <BrowserRouter>
        <Routes>{setRouter()}</Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
