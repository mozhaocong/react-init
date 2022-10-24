import React from 'react'
import { Button, Table } from 'antd'
import { baseTableColumns } from '@/components/model/Form/indexType'
import { mockDataSource } from '@/uitls/model/business'

class table extends baseTableColumns {
  constructor() {
    super()
    this.setColumns([
      { dataIndex: 'a', title: '子单号' },
      { dataIndex: 'b', title: '供应商' },
      { dataIndex: 'c', title: '结算金额' },
      {
        dataIndex: 'd',
        title: '操作',
        render(item, res) {
          console.log(item, res)
          return (
            <>
              <Button>确认通过</Button>
              <Button>确认拒绝</Button>
            </>
          )
        }
      }
    ])
  }
}

const View = () => {
  return (
    <div>
      <div>采购需求单</div>
      <div>
        <Table
          columns={new table().data}
          dataSource={mockDataSource(new table().data)}
        />
      </div>
    </div>
  )
}

export default View
