//生产信息
import React, { useEffect, useState } from 'react'
import Details from './model/details'
import { Tabs } from 'antd'

const list = ['YPPO2209010001-01', 'YPPO2209010001-02', 'YPPO2209010001-03', 'YPPO2209010001-04']

const View = () => {
	const [tabsData, setTabsData] = useState([])
	useEffect(() => {
		setTabsData(
			list.map(item => {
				return { label: item, key: item, children: <Details id={item} /> }
			})
		)
		console.log('生产信息')
	}, [])
	return (
		<div>
			<Tabs defaultActiveKey={list[0]} items={tabsData} key={'id'} />
		</div>
	)
}

export default View
