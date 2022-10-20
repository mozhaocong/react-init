import React, { useEffect, useMemo, useState } from 'react'
import { HtForm } from '@/components'
import { baseFormColumnsItem } from '@/components/model/Form/indexType'
import { Table, Input } from 'antd'
import { useRequest } from '@/view/search/hooks'
import { axiosGet } from 'html-mzc-tool'
import CheckedTag from './model/CheckedTag'
import Search from './model/Search'

function orders(data = {}) {
  return axiosGet('http://crm_test.htwig.com/order/api/orders', data)
}

const { useFormData } = HtForm

class searchColumn extends baseFormColumnsItem {
  constructor() {
    super()
    this.setColumns([
      { label: '编号检索', name: 'no', component: () => <Input /> },
      { label: '客户检索', name: 'customer_name', component: () => <Input /> },
      { label: '运单号', name: 'shipping_no', component: () => <Input /> },
      { label: '订单类型', name: 'type', component: () => <Input /> },
      { label: '发货方式', name: 'delivery_type', component: () => <Input /> }
    ])
  }
}

const columns = new searchColumn().data

const View = () => {
  const { value, valueData, setValue } = useFormData({})
  const [dataSource, setDataSource] = useState([])
  const [searchData, setSearchData] = useState({})

  function onFinish(value) {
    setSearchData(value)
    search(value)
  }
  function onReset() {
    setSearchData(value)
    setValue({})
    search({})
  }
  const { search, loading, pageSize, refresh, Pagination } = useRequest(
    orders,
    {
      defaultParams: { is_simple: 0 },
      onSuccess(item) {
        setDataSource(item?.data?.data)
      }
    }
  )
  useEffect(() => {
    search({})
  }, [])

  const listSearch = useMemo(() => {
    return [{ setValue, value, columns: columns as any }]
  }, [searchData])

  return (
    <div>
      <div>View</div>
      <Search
        loading={loading}
        fId={'searchTest'}
        value={value}
        valueData={valueData}
        setValue={setValue}
        columns={columns}
        onChange={setValue}
        onFinish={onFinish}
        onReset={onReset}
      />
      <CheckedTag listSearch={listSearch} />
      <SearchTable dataSource={dataSource} rowKey={'no'} loading={loading} />
      <Pagination />
    </div>
  )
}

const tableColumns = [
  {
    title: '订单信息',
    dataIndex: 'no'
  },
  {
    title: '产品信息',
    dataIndex: 'category_name'
  },
  {
    title: '费用信息',
    dataIndex: 'total_price'
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at'
  },
  {
    title: '日期',
    dataIndex: 'plat_created_time'
  }
]

const SearchTable = (props) => {
  const { dataSource = [], ...attrs } = props
  return (
    <Table
      pagination={false}
      columns={tableColumns}
      dataSource={dataSource}
      {...attrs}
    />
  )
}

export default View
