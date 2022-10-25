// 原料出库信息
import { baseTableColumns } from '@/components/model/Form/indexType'
import { Table } from 'antd'
import { mockDataSource } from '@/uitls/model/business'
import React from 'react'

class table extends baseTableColumns {
  constructor() {
    super()
    this.setColumns([
      { dataIndex: 'a', title: '出库单号' },
      { dataIndex: 'b', title: '出库单状态' },
      { dataIndex: 'c', title: '出库时间' },
      { dataIndex: 'd', title: '出库数量' }
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
