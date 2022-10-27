// 退货信息
import React from 'react'
import { baseTableColumns } from '@/components/model/Form/uitls'
import { Table } from 'antd'
import { mockDataSource } from '@/uitls/model/business'

class table extends baseTableColumns {
  constructor() {
    super()
    this.setColumns([
      { dataIndex: 'a', title: '退货单号' },
      { dataIndex: 'b', title: '退货单状态' },
      { dataIndex: 'c', title: '退货时间' },
      { dataIndex: 'd', title: '退货数量' },
      { dataIndex: 'e', title: '物流' },
      { dataIndex: 'f', title: '运单号' }
    ])
  }
}
const View = () => {
  return (
    <div>
      <Table
        columns={new table().data}
        dataSource={mockDataSource(new table().data)}
        pagination={false}
      />
    </div>
  )
}

export default View
