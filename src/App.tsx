// @ts-ignore
import React, { useEffect } from 'react'
import routes, { mapRouter } from '@/routes'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import { Button, ConfigProvider } from 'antd'
import { isTrue } from 'html-mzc-tool'

export function Interceptor(pros) {
  const { route } = pros
  const RenderCom = route.component
  return <RenderCom route={route} />
}

const RouterButton = () => {
  const navigate = useNavigate()
  const data = []
  for (const mapKey in mapRouter) {
    data.push({ title: mapKey })
  }
  return (
    <div>
      {data.map((item) => {
        return (
          <Button
            onClick={() => {
              navigate(item.title)
            }}
          >
            {item.title}
          </Button>
        )
      })}
    </div>
  )
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
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <RouterButton />
        <Routes>{setRouter()}</Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
