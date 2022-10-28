import React from 'react'

import { HtForm } from '@/components'
import { baseFormColumnsItem, baseTableColumns } from 'react-mzc-components'
import { Divider, Table, Tabs } from 'antd'
import { mockDataSource } from '@/utils/model/business'
import BillingInfo from './model/billingInfo'
import DeliveryInfo from './model/deliveryInfo'
import ProductionInfo from './model/productionInfo'
import ReceiptInfo from './model/receiptInfo'
import ReturnInfo from './model/returnInfo'
import RawMaterialDeliveryInfo from './model/rawMaterialDeliveryInfo'
import RawMaterialReturnInfo from './model/rawMaterialReturnInfo'
const { ShowText, useFormData } = HtForm

const tabsData = () => {
	return [
		{ label: `生产信息`, key: '1', children: <ProductionInfo /> },
		{ label: `发货信息`, key: '2', children: <DeliveryInfo /> },
		{ label: `收货信息`, key: '3', children: <ReceiptInfo /> },
		{ label: `结算信息`, key: '4', children: <BillingInfo /> },
		{ label: `原料出库信息`, key: '5', children: <RawMaterialDeliveryInfo /> },
		{ label: `原料回库信息`, key: '6', children: <RawMaterialReturnInfo /> },
		{ label: `退货信息`, key: '7', children: <ReturnInfo /> }
	]
}

class setData extends baseFormColumnsItem {
	constructor() {
		super()
		this.setColumns([
			{ name: 'a', label: '送货仓库', component: () => <ShowText /> },
			{ name: 'e', label: '业务约定交期', component: () => <ShowText /> },
			{ name: 'b', label: '所属品牌', component: () => <ShowText /> },
			{ name: 'c', label: '采购单备注', component: () => <ShowText /> }
		])
	}
}

class table extends baseTableColumns {
	constructor() {
		super()
		this.setColumns([
			{ dataIndex: 'a', title: '赫特SKU' },
			{ dataIndex: 'b', title: '变体属性' },
			{ dataIndex: 'c', title: '采购数' },
			{ dataIndex: 'd', title: '发货数' },
			{ dataIndex: 'e', title: '正品数' },
			{ dataIndex: 'f', title: '次品数' }
		])
	}
}

const View = () => {
	const { value, setValue } = useFormData({
		a: '河南郑州包税物流中心',
		b: 'LUVME',
		c: 'XXXXXXXXXXX',
		e: '2022-10-30'
	})
	return (
		<div>
			<div>需求母单明细 赫特SPU: HTLM00001</div>
			<Divider />
			<HtForm col={{ span: 12 }} labelCol={{ flex: '100px' }} labelAlign={'left'} columns={new setData().data} value={value} onChange={setValue} />
			<Table columns={new table().data} dataSource={mockDataSource(new table().data, 2)} pagination={false} rowKey={'id'} />

			<Tabs defaultActiveKey='1' items={tabsData()} key={'id'} />
		</div>
	)
}

export default View
