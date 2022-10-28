import React from 'react'
import { HtForm } from '@/components'
import { Button, Col, Input, DatePicker } from 'antd'
import { baseFormTableColumnsItem, baseFormColumnsItem } from 'react-mzc-components'
const { ShowText, FormTable, useFormData } = HtForm
const { RangePicker } = DatePicker

class form extends baseFormColumnsItem {
	constructor() {
		super()
		this.setColumns([
			{
				name: 'c1',
				label: 'spu',
				component: () => <Input />,
				rules: [{ required: true }]
			},
			{
				name: 'c2',
				label: '所属品牌',
				component: () => <Input />,
				rules: [{ required: true }]
			},
			{
				name: 'c3',
				label: '送货仓库',
				component: () => <Input />,
				rules: [{ required: true }]
			},
			{
				name: 'c4',
				label: '业务约定交期',
				component: () => <RangePicker />,
				rules: [{ required: true }]
			},
			{
				name: 'c5',
				label: '选择样品',
				component: () => <Input />,
				rules: [{ required: true }]
			},
			{ name: 'c6', label: '特殊标记', component: () => <Input /> },
			{
				name: 'c7',
				label: '采购单备注',
				col: { flex: '1000px' },
				wrapperCol: { flex: '600px' },
				component: () => <Input />
			},
			{
				render: config => {
					return (
						<Col span={24}>
							<FormTable {...config} columns={new formTable().data} formName='test' isForm={false} />
						</Col>
					)
				}
			}
		])
	}
}
class formTable extends baseFormTableColumnsItem {
	constructor() {
		super()
		this.setColumns([
			{ title: '序号', render: item => this.serialNumber(item) },
			{ dataIndex: 'a2', title: 'SKU图片', render: () => <ShowText /> },
			{ dataIndex: 'a3', title: 'SKU', render: () => <Input /> },
			{ dataIndex: 'a4', title: '变体属性', render: () => <ShowText /> },
			{ dataIndex: 'a4', title: '采购数', render: () => <Input /> },
			{
				title: '操作',
				width: 300,
				render: item => {
					return this.actionButton(item, 'test')
				}
			}
		])
	}
}

const View = () => {
	const { value, setValue, ...attrs } = useFormData({
		c1: '1',
		test: [{ a2: 1 }, { a2: 2 }]
	})
	function onFinish(value) {
		console.log(value)
	}
	return (
		<div>
			<HtForm
				fId={'pageCreatePurchaseRequisition'}
				col={{ flex: '500px' }}
				labelCol={{ flex: '130px' }}
				wrapperCol={{ flex: '300px' }}
				labelAlign={'left'}
				{...attrs}
				value={value}
				setValue={setValue}
				onChange={setValue}
				columns={new form().data}
				onFinish={onFinish}
			/>
			<Button htmlType={'submit'} form={'pageCreatePurchaseRequisition'}>
				查看
			</Button>
		</div>
	)
}
export default View
