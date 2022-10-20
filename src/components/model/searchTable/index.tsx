import React, { useEffect, useMemo, useState } from 'react'
import { HtForm } from '@/components'
import { _FormType } from '@/components/model/Form/indexType'
import { Table } from 'antd'
import { useRequest } from './hooks'
import { deepClone, isArray, isTrue } from 'html-mzc-tool'
import CheckedTag, { listSearchType } from './model/CheckedTag'
import Search from './model/Search'
import { TableProps } from 'antd/lib/table/Table'

const { useFormData } = HtForm

type searchTableType = {
  search: Omit<
    _FormType,
    'value' | 'valueData' | 'setValue' | 'loading' | 'onChange'
  > &
    Required<Pick<_FormType, 'columns' | 'fId'>>
  table: Omit<TableProps<any>, 'pagination' | 'loading' | 'dataSource'> &
    Required<Pick<TableProps<any>, 'columns' | 'rowKey'>>
  checkedListSearch?: listSearchType[]
  useRequest: {
    apiRequest: (item: ObjectMap) => Promise<any>
    onSuccess: (
      item: ObjectMap,
      pageConfig?: { pageSize: number; current: number }
    ) => ObjectMap[]
    defaultParams?: ObjectMap
  }
}

const View = (props: searchTableType) => {
  const {
    search: propsSearch,
    table: propsTable,
    checkedListSearch,
    useRequest: propsUseRequest
  } = props
  const {
    onFinish: propsOnFinish,
    columns,
    fId,
    ...searchAttrs
  } = propsSearch || {}
  const { apiRequest, onSuccess, defaultParams = {} } = propsUseRequest || {}

  const { value, valueData, setValue } = useFormData({})
  const [dataSource, setDataSource] = useState([])
  const [searchData, setSearchData] = useState({})

  function onFinish(value) {
    const data = deepClone(value)
    setSearchData(data)
    search(data)
    if (isTrue(propsOnFinish)) {
      propsOnFinish(data)
    }
  }
  function onReset() {
    setSearchData({})
    setValue({})
    search({})
  }
  const { search, loading, Pagination, current, pageSize } = useRequest(
    apiRequest,
    {
      defaultParams: defaultParams,
      onSuccess(item) {
        const apiData = onSuccess(item, { current, pageSize })
        if (isTrue(apiData) && isArray(apiData)) {
          setDataSource(apiData)
        }
      },
      setSearchData(item) {
        return item
      }
    }
  )
  useEffect(() => {
    search({})
  }, [])

  // 只监听 searchData 和 checkedListSearch 所以搜索时记得更新searchData
  const listSearch = useMemo(() => {
    let listData = [{ value: searchData, columns: columns as any }]
    if (isTrue(checkedListSearch)) {
      listData = [...checkedListSearch, ...listData]
    }
    return listData
  }, [searchData, checkedListSearch])

  function onSearch(value) {
    // 改变CheckedTag的值
    onFinish(value)
    // 改变search的值
    setValue(value)
  }

  return (
    <div>
      <div>View</div>
      <Search
        loading={loading}
        fId={fId}
        value={value}
        valueData={valueData}
        setValue={setValue}
        columns={columns}
        onChange={setValue}
        onFinish={onFinish}
        {...{ ...searchAttrs, onReset: onReset }}
      />
      <CheckedTag listSearch={listSearch} onSearch={onSearch} />
      <Table
        loading={loading}
        pagination={false}
        dataSource={dataSource}
        {...propsTable}
      />
      <Pagination />
    </div>
  )
}

export default View
