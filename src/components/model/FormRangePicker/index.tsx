import type { DatePickerProps } from 'antd'
import { DatePicker } from 'antd'
import moment from 'moment'
import React from 'react'
const { RangePicker } = DatePicker

const View = (props: DatePickerProps) => {
  return <RangePicker />
}
