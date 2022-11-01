import React from 'react'
import './index.less'
const View = () => {
	const data = [
		{ label: '待确认', value: 'a1' },
		{ label: '待核算', value: 'a2' },
		{ label: '结算待核算', value: 'a3' },
		{ label: '已审核', value: 'a4' },
		{ label: '部分结算', value: 'a5' },
		{ label: '已结算', value: 'a6' }
	]
	return (
		<div className={'checkBox-components'}>
			{data.map(item => {
				return (
					<div className={'check-block'}>
						<div className={'ico-are'}>
							<div className={'check-line'} />
							<div className={'ico-block'}></div>
							<div className={'check-line'} />
						</div>
						<div>{item.label}</div>
					</div>
				)
			})}
		</div>
	)
}

export default View
