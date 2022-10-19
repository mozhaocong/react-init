import React from 'react'
import { HtForm } from '@/components'
import {
  _FormType,
  baseFormColumnsItem
} from '@/components/model/Form/indexType'
import { Input } from 'antd/es'
import { Button, Table } from 'antd'
import { useRequest } from '@/view/search/hooks'

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

const View = () => {
  const { value, valueData, setValue } = useFormData({})
  function onFinish(value) {
    console.log(value)
  }
  const { search, loading, pageSize, refresh } = useRequest({})
  return (
    <div>
      <div>View</div>
      <Search
        value={value}
        valueData={valueData}
        setValue={setValue}
        columns={new searchColumn().data}
        onChange={setValue}
        onFinish={onFinish}
      />
      <SearchTable />
    </div>
  )
}

const Search = (props: _FormType) => {
  const { value, ...attrs } = props
  return (
    <div>
      <HtForm {...{ value, ...attrs }} />
      <div>
        <Button>搜索</Button>
        <Button>重置</Button>
      </div>
    </div>
  )
}

const columns = [
  {
    title: '订单信息',
    dataIndex: 'no'
  },
  {
    title: '产品信息',
    dataIndex: 'order_items'
  },
  {
    title: '费用信息',
    dataIndex: 'total_price'
  },
  {
    title: '物流信息',
    dataIndex: 'out_repo_orders'
  },
  {
    title: '日期',
    dataIndex: 'plat_created_time'
  }
]

const SearchTable = (props) => {
  const { dataSource = [] } = props
  return <Table columns={columns} dataSource={dataSource} />
}

export default View
