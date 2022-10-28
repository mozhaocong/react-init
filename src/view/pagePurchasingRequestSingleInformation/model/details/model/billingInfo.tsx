// 结算信息
import React, { useEffect } from 'react'
import { baseTableColumns } from 'react-mzc-components'
import { Table } from 'antd'
import { mockDataSource } from '@/utils/model/business'
class table extends baseTableColumns {
	constructor() {
		super()
		this.setColumns([
			{ dataIndex: 'a', title: '结算单号' },
			{ dataIndex: 'b', title: '结算状态' },
			{ dataIndex: 'c', title: '正品数量' },
			{ dataIndex: 'd', title: '结算金额' },
			{ dataIndex: 'e', title: '支付完成时间' }
		])
	}
}
const View = () => {
	useEffect(() => {
		console.log('结算信息')
	}, [])
	return (
		<div>
			<Table columns={new table().data} dataSource={mockDataSource(new table().data, 1)} pagination={false} />
		</div>
	)
}

export default View
