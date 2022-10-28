import React from 'react'

import { HtForm } from '@/components'
import { baseFormColumnsItem, baseTableColumns } from 'react-mzc-components'
import { Table } from 'antd'
import { mockDataSource } from '@/utils/model/business'
const { ShowText, useFormData } = HtForm
class Form extends baseFormColumnsItem {
	constructor() {
		super()
		this.setColumns([
			{ name: 'b1', label: '材质', component: () => <ShowText /> },
			{ name: 'b2', label: '曲度', component: () => <ShowText /> },
			{ name: 'b3', label: '染色色号', component: () => <ShowText /> },
			{ name: 'b4', label: '密度', component: () => <ShowText /> },
			{ name: 'b5', label: 'YAKI', component: () => <ShowText /> },
			{ name: 'b6', label: '廓形', component: () => <ShowText /> },
			{ name: 'b7', label: '蕾丝面积', component: () => <ShowText /> },
			{ name: 'b8', label: '目标重量', component: () => <ShowText /> },
			{
				name: 'b9',
				label: '需求描述',
				col: { span: 24 },
				component: () => <ShowText />
			},
			{
				name: 'b10',
				label: '参照图片',
				col: { span: 24 },
				component: () => <ShowText />
			}
		])
	}
}

class table extends baseTableColumns {
	constructor() {
		super()
		this.setColumns([
			{ dataIndex: 'a', title: '序号' },
			{ dataIndex: 'b', title: '工序代码' },
			{ dataIndex: 'c', title: '工序名称' },
			{ dataIndex: 'd', title: '单价' }
		])
	}
}

const View = props => {
	const { value } = useFormData({ b1: 1, b2: 2 })
	return (
		<div>
			<HtForm col={{ span: 8 }} columns={new Form().data} value={value} labelCol={{ flex: '100px' }} />
			<div>
				<div>生产工序信息：</div>
				<div>
					<Table columns={new table().data} dataSource={mockDataSource(new table().data, 2)} pagination={false} />
				</div>
			</div>
		</div>
	)
}

export default View
