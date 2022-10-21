import { baseFormColumnsItem } from '@/components/model/Form/indexType'
import React from 'react'
import { axiosGet } from 'html-mzc-tool'
import { Input } from 'antd'
import { SearchTable } from '@/components'
import { setFormColumnsSlotName } from '@/components/model/Form/uitls'

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
      { label: '发货方式', name: 'delivery_type', component: () => <Input /> },
      { slotName: 'spPlatform' }
    ])
  }
}

export const pageSate = {
  spPlatform: {
    // 组件列表slot name
    selectNane: ['spPlatform', 'select'], // form表单的Name
    optionNane: ['spPlatform', 'option'],
    initialValue: {
      select: 'sellerSku',
      option: 1
    },
    placeholder: 'Select province',
    slotType: 'selectOption', // 组件模式
    component: () => {
      return <Input />
    },
    slotList: [
      { label: '创建人', key: 'sku' },
      { label: '销售负责人', key: 'sellerSku' }
    ]
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
      search={{
        fId: 'searchTest',
        columns: setFormColumnsSlotName(new searchColumn().data, pageSate)
      }}
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
