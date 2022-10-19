import Pagination from '../model/pagination.js'
// @ts-ignore
import { useState } from 'react'
import { isObject, isTrue, objectFilterEmpty } from 'html-mzc-tool'
const optionsDefData = {
  paginationReq: ['data', 'pagination'],
  paginationConfig: {
    current: 'current',
    pageSize: 'pageSize',
    total: 'total'
  },
  setPaginationParam: {
    current: 'current',
    pageSize: 'pageSize'
  }
}

type

export function useRequest(request: any, options: any = {}) {
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(1)
  const [total, setTotal] = useState('')
  const [param, setParam] = useState({})

  function resetPagination(is = true) {
    return {
      [optionsDefData.setPaginationParam.current]: is ? '' : current,
      [optionsDefData.setPaginationParam.pageSize]: is ? '' : pageSize
    }
  }

  async function search(data = {}, config = {}) {
    let is = true
    if (isObject(config)) {
      const { resetPagination = true } = config
      is = resetPagination
    }
    let params = { ...data, ...resetPagination(is) }
    if (options.setSearchData) {
      params = options.setSearchData(params)
    }
    await run(params)
  }

  async function refresh(isResetPagination = false) {
    const item = { ...param, ...resetPagination(isResetPagination) }
    await run(item)
  }

  async function run(data = {}) {
    setLoading(true)
    const params = objectFilterEmpty(data)
    setParam(params)
    let item: any = {}
    if (options.customizeRun) {
      item = await options.customizeRun({
        ...(options.defaultParams || {}),
        ...params
      })
    } else {
      item = await request({ ...(options.defaultParams || {}), ...params })
    }
    if (!isTrue(item)) {
      throw '请求接口错误'
    }
    if (item.state == 200) {
      const optionsData = { ...optionsDefData, ...options }
      let paginationReqData: any = {}
      if (isTrue(optionsData.paginationReq)) {
        paginationReqData = item
        optionsData.paginationReq.forEach((res: any) => {
          try {
            paginationReqData = paginationReqData[res]
          } catch (e) {
            console.log('optionsData.paginationReq 数据不对')
            paginationReqData = {}
          }
        })
      }

      if (isTrue(paginationReqData) && isObject(paginationReqData)) {
        setCurrent(
          paginationReqData[optionsData?.paginationConfig?.current] ?? 1
        )
        setPageSize(
          paginationReqData[optionsData?.paginationConfig?.pageSize] ?? 1
        )
        setTotal(paginationReqData[optionsData?.paginationConfig?.total] ?? '')
      }
    }
    if (options.onSuccess) {
      options.onSuccess(item)
    }
    setLoading(false)
  }

  return {
    run,
    loading,
    current,
    pageSize,
    setLoading,
    refresh,
    resetPagination,
    search,
    Pagination: (props: any) =>
      Pagination({
        current,
        pageSize,
        total,
        // @ts-ignore
        loading,
        onChange: (item: any) => {
          // 点击回到顶
          // if (isTrue(options.scrollbarsTop)) {
          //   const booleanOrDom = options.scrollbarsTop
          //   if (isBoolean(booleanOrDom) && booleanOrDom) {
          //     scrollbarsTop()
          //   } else {
          //     scrollbarsTop(booleanOrDom())
          //   }
          // }

          const optionsData = { ...optionsDefData, ...options }
          const itemParam = {
            ...param,
            [optionsData.setPaginationParam.current]: item.current,
            [optionsData.setPaginationParam.pageSize]: item.pageSize
          }
          if (props.onChange) {
            props.onChange()
          }
          run(itemParam)
        },
        onShowSizeChange: (item: any) => {
          const optionsData = { ...optionsDefData, ...options }
          const itemParam = {
            ...param,
            [optionsData.setPaginationParam.current]: item.current,
            [optionsData.setPaginationParam.pageSize]: item.pageSize
          }
          run(itemParam)
        }
      })
  }
}
