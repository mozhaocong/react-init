import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, asyncIncrement } from '@/store/features/counterSlice'
import { Button } from 'antd'
const View = () => {
	const { count } = useSelector((state: any) => state?.counter)
	const dispatch = useDispatch()
	return (
		<div>
			<div>{count}</div>
			<Button onClick={() => dispatch(decrement())}>decrement</Button>
			<Button onClick={() => dispatch(increment({ step: 2 }))}>increment</Button>
			<Button onClick={() => dispatch(asyncIncrement({}))}>increment</Button>
		</div>
	)
}
export default View
