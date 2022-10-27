// 发货信息
import React from 'react'
import { baseTableColumns } from '@/components/model/Form/uitls'
import { Table } from 'antd'
import { mockDataSource } from '@/uitls/model/business'

class table extends baseTableColumns {
  constructor() {
    super()
    this.setColumns([
      { dataIndex: 'a', title: '发货单号' },
      { dataIndex: 'b', title: '发货单状态' },
      { dataIndex: 'c', title: '发货时间' },
      { dataIndex: 'd', title: '发货数量' },
      { dataIndex: 'e', title: '物流' },
      { dataIndex: 'f', title: '运单号' },
      { dataIndex: 'g', title: '发起人' }
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
