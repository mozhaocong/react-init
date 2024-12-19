import { Components } from '@ht/common-modules'
import { ButtonProps } from 'antd/lib/button/button'
import React, { useMemo, useState } from 'react'
const { LoadingButton } = Components

interface propertyType extends Omit<ButtonProps, 'onClick'> {
	onClick?: (event: any, setLoading: (item: boolean) => void) => void
	uuid?: string
	disabledMessage?: string
}

const View: React.FC<propertyType> = properties => {
	const { onClick: propertyOnClick, loading: propertyLoading, ...attributes } = properties

	const [loading, setLoading] = useState(false)
	const loadingData = useMemo(() => {
		return propertyLoading ?? loading
	}, [loading, propertyLoading])
	function onClick(event: any): void {
		propertyOnClick?.(event, setLoading)
	}
	// return <Button {...{ ...attributes, loading: loadingData, onClick }} />

	return <LoadingButton {...{ ...attributes, loading: loadingData, onClick }} />
}
export default React.memo(View)
