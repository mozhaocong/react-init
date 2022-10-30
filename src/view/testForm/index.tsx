import React, { useMemo, useState } from 'react'
import { Button } from 'antd'
import { formRows } from '@/view/testForm/configData'
import { HtForm } from '@/components'
const { useFormData } = HtForm

const App = () => {
	const [form, seForm] = useState()
	const formData = useMemo(() => {
		return new formRows({ formRef: form }).data
	}, [form])

	const { value, setValue, valueData } = useFormData({
		name: 'ASGASGA'
	})

	console.log('1')
	return (
		<div>
			{/*<HtSelect options={configBusinessDataOptions.integralType} />*/}
			<HtForm propsForm={seForm} columns={formData} value={value} onChange={setValue} setValue={setValue} valueData={valueData} />
			<Button
				onClick={() => {
					console.log('value', valueData)
				}}>
				value
			</Button>
		</div>
	)
}

export default App
