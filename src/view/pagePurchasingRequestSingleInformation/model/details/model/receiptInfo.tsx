// 收货信息
import React from 'react'
import { baseTableColumns } from 'react-mzc-components'
import { Table } from 'antd'
import { mockDataSource } from '@/uitls/model/business'

class table extends baseTableColumns {
	constructor() {
		super()
		this.setColumns([
			{ dataIndex: 'a', title: '收货单号' },
			{ dataIndex: 'b', title: '收货单状态' },
			{ dataIndex: 'c', title: '收货时间' },
			{ dataIndex: 'd', title: '收货数量' }
		])
	}
}
const View = () => {
	return (
		<div>
			<Table columns={new table().data} dataSource={mockDataSource(new table().data)} pagination={false} />
		</div>
	)
}

export default View
