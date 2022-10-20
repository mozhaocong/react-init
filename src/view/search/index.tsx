import { baseFormColumnsItem } from '@/components/model/Form/indexType'
import React from 'react'
import { axiosGet } from 'html-mzc-tool'
import { Input } from 'antd'
import SearchTable from '@/components/model/searchTable'

function orders(data = {}) {
  return axiosGet('http://crm_test.htwig.com/order/api/orders', data)
}

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

const View = () => {
  return (
    <SearchTable
      search={{ fId: 'searchTest', columns: new searchColumn().data }}
      table={{ columns: tableColumns, rowKey: 'no' }}
      useRequest={{
        defaultParams: { is_simple: 0 },
        apiRequest: orders,
        onSuccess(item, res) {
          console.log(item, res)
          return item?.data?.data
        }
      }}
    />
  )
}

export default View
