import React, { useEffect, useMemo, useState } from 'react'
import './index.less'
import { deepClone, isTrue } from 'html-mzc-tool'

type valeType = Array<string | number>
type propsType = {
	allBox?: boolean
	isRadio?: boolean
	options: { value: string | number; label: string }[]
	value?: valeType
	defaultValue?: valeType
	onChange?: (item: valeType) => void
	onChangeLabel?: (item: valeType) => void
}
const View = (props: propsType) => {
	const {
		allBox = true,
		isRadio = false,
		value: propsValue,
		defaultValue: propsDefaultValue = [],
		onChange,
		onChangeLabel,
		options: propsOptions
	} = props

	const [defaultValue, setValue] = useState<any[]>(propsDefaultValue)

	const value = useMemo(() => {
		return propsValue ?? defaultValue
	}, [propsValue, defaultValue])

	const options = useMemo(() => {
		const data = deepClone(propsOptions)
		if (allBox) {
			data.unshift({ label: '全部', value: '' })
		}
		return data
	}, [allBox, propsOptions])

	useEffect(() => {
		setCheckValue(value)
	}, [])

	function setCheckValue(valueItem) {
		let length = options.length
		let valueData = deepClone(valueItem)
		if (allBox) {
			length -= 1
			if (valueItem.length === length) {
				valueData = ['']
			}
		}
		if (!isTrue(valueData)) {
			valueData.push('')
		}
		const labelData = []
		options.forEach(item => {
			if (valueData.includes(item.value)) {
				labelData.push(item.label)
			}
		})
		if (onChange) {
			onChange(valueData)
		}
		if (onChangeLabel) {
			onChangeLabel(labelData)
		}
		setValue(valueData)
	}

	function setCheck(item: any) {
		let dataValue = value.filter(item => {
			return item !== ''
		})
		if (item.value === '') {
			dataValue = []
			dataValue.push('')
		} else if (!dataValue.includes(item.value)) {
			if (isRadio) {
				dataValue = [item.value]
			} else {
				dataValue.push(item.value)
			}
		}
		setCheckValue(dataValue)
	}
	return (
		<div className={'checkBox-components'}>
			{options.map((item, index) => {
				return (
					<div className={'check-block'} key={index}>
						<div className={'ico-area'}>
							<div className={'check-line'} style={index ? {} : { border: 0 }} />
							<div
								className={`ico-block ${value.includes(item.value) ? 'current-ico' : ''}`}
								onClick={() => {
									setCheck(item)
								}}
							/>
							<div className={'check-line'} />
						</div>
						<div className={'label-area'}>
							<div
								onClick={() => {
									setCheck(item)
								}}>
								{item.label}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default React.memo(View)
