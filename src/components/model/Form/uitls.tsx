import { debounce, isArray, isTrue } from 'html-mzc-tool'
import { Form, Select } from 'antd'
import React, { useMemo, useRef, useState } from 'react'
import {
  arrayToObject,
  getArrayToObjectTargetValue
} from '@/uitls/model/business'

const { Option } = Select

export function setFormDefValue(row, data) {
  const returnData = {}
  row.forEach((item) => {
    if (!isTrue(item.name) || !isTrue(data[item.name])) return
    returnData[item.name] = data[item.name]
  })
  return returnData
}

export const getFormName = (fieldName, name) => {
  let data = [fieldName]
  if (isArray(fieldName)) {
    data = fieldName
  }
  if (isArray(name)) {
    data = [...data, ...name]
  } else {
    data.push(name)
  }
  return data
}

// 防抖 避免多少触发更新
const setValueDebounce = debounce(setValueMethod, 10)
function setValueMethod(item, stateData) {
  const { value, setValue } = stateData
  if (isArray(item.selectNane)) {
    let isInit = false
    const arrayData = arrayToObject(value, item.selectNane, (res) => {
      if (!isTrue(res)) {
        isInit = true
        return item.initialValue.select
      }
      return res
    })
    if (isInit) {
      setValue(arrayData)
    }
  }
}

// 获取 Form value 的name， name 是数组或者字符
export function getFormValueFromName(
  value: ObjectMap,
  item: Array<string | number> | string | number
) {
  if (isArray(item)) {
    return getArrayToObjectTargetValue(value, item)
  } else {
    return value[item as string]
  }
}

export function setSlotComponents(item, stateData) {
  const { value } = stateData
  setValueDebounce(item, stateData)
  return (
    <Form.Item label={item.label}>
      <Form.Item
        initialValue={item.initialValue?.select}
        name={item.selectNane}
        noStyle
        rules={[{ required: true, message: 'Province is required' }]}
      >
        <Select placeholder={item.placeholder}>
          {item.slotList.map((res) => {
            return (
              <Option value={res.key} key={res.key}>
                {res.label}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      {isTrue(
        getFormValueFromName(value, item.selectNane) ??
          item?.initialValue?.select
      ) &&
        item.slotList
          .filter((res) => {
            return (
              res.key ===
              (getFormValueFromName(value, item.selectNane) ??
                item?.initialValue?.select)
            )
          })
          .map((res) => {
            return (
              <Form.Item
                name={res.name ?? item.optionNane}
                initialValue={res.initialValue ?? item.initialValue?.option}
                key={res.key}
                noStyle
              >
                {res.component ? res.component() : item.component()}
              </Form.Item>
            )
          })}
    </Form.Item>
  )
}

export function setDataData(item, pageSate, valueOption) {
  return item.map((res) => {
    if (res.slotName && pageSate[res.slotName]) {
      res.render = () => {
        return setSlotComponents(pageSate[res.slotName], valueOption)
      }
    }
    return res
  })
}

export function useFormData(item = {}, config: any = {}) {
  const { rows = {}, rowSlots = {} } = config

  const valueData = useRef({ value: item })
  const [value, setValue] = useState(item)
  const handle = (v) => {
    valueData.current.value = v
    setValue(v)
  }

  const rowList = useMemo(() => {
    if (isTrue(rows)) {
      const { data = [] } = rows
      return setDataData(data, rowSlots, { value, setValue })
    }
  }, [value, rows])

  return { value, setValue: handle, valueData: valueData.current, rowList }
}
