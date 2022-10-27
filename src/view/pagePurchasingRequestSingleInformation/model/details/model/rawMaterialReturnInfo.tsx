// 原料回库信息
import { baseTableColumns } from '@/components/model/Form/uitls'
import { Table } from 'antd'
import { mockDataSource } from '@/uitls/model/business'
import React from 'react'

class table extends baseTableColumns {
  constructor() {
    super()
    this.setColumns([
      { dataIndex: 'a', title: '收货单号' },
      { dataIndex: 'b', title: '状态' },
      { dataIndex: 'c', title: '发货时间' },
      { dataIndex: 'd', title: '发货数量' }
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
