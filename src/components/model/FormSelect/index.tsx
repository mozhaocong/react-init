import React, { forwardRef, useMemo } from 'react'
import { Select } from 'antd'
import {
  configBusinessDataOptions,
  configBusinessDataOptionsType
} from './config'
import { SelectProps } from 'antd/lib/select'
const { Option } = Select

interface propsType extends SelectProps {
  prop: keyof configBusinessDataOptionsType
  typeTransform?: { value: string; label: string }
}

const View = forwardRef((props: propsType, ref) => {
  const { prop, typeTransform, ...attrs } = props
  const options = useMemo(() => {
    return configBusinessDataOptions[prop] || []
  }, [prop])

  return (
    // @ts-ignore
    <Select ref={ref} {...{ style: { width: '100%' }, ...attrs }}>
      {options.map((item) => {
        return (
          <Option
            value={item[typeTransform?.value ?? 'value']}
            key={item[typeTransform?.value ?? 'value']}
          >
            {item[typeTransform?.label ?? 'label']}
          </Option>
        )
      })}
    </Select>
  )
})

export default React.memo(View)
