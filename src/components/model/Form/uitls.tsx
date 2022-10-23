import { debounce, deepClone, isArray, isString, isTrue } from 'html-mzc-tool'
import { Form, Select } from 'antd'
import React, { useMemo, useRef, useState } from 'react'
import {
  arrayToObject,
  getArrayToObjectTargetValue
} from '@/uitls/model/business'
import { data } from 'autoprefixer'

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
      console.log('arrayData', arrayData)
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
    return deepClone(value[item as string])
  }
}

export function setNameToValue(
  value: ObjectMap,
  setData: string | Array<string | number>,
  setMethod: (item: any) => string | number | null | undefined
) {
  if (isArray(setData)) {
    return arrayToObject(value, setData, setMethod)
  } else if (isString(setData)) {
    const data = deepClone(value)
    data[setData] = setMethod(deepClone(data[setData]))
    return data
  } else {
    return value
  }
}

function SelectChange(e, option, item, stateDate) {
  console.log(e, option, item, stateDate)
  const { valueData, setValue, valueOtherData } = stateDate
  let slotName = ''
  item.slotList.forEach((res) => {
    if (res.key === e) {
      slotName = res.name ?? item.optionNane
    }
  })

  let selectNameLabel: any
  if (isArray(item.selectNane)) {
    selectNameLabel = deepClone(item.selectNane)
    selectNameLabel[selectNameLabel.length - 1] =
      selectNameLabel[selectNameLabel.length - 1] + 'Label'
  } else {
    selectNameLabel = item.selectNane + 'label'
  }
  valueOtherData.value = setNameToValue(
    valueOtherData.value,
    selectNameLabel,
    () => {
      return option.children
    }
  )

  const returnData = setNameToValue(valueData.value, slotName, () => {
    return undefined
  })
  setValue(returnData)
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
        <Select
          placeholder={item.placeholder}
          onChange={(e, res) => SelectChange(e, res, item, stateData)}
        >
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
                {res.component
                  ? res.component(stateData)
                  : item.component(stateData)}
              </Form.Item>
            )
          })}
    </Form.Item>
  )
}

export function setFormColumnsSlotName(item, pageSate) {
  return item.map((res) => {
    if (res.slotName && pageSate[res.slotName]) {
      res.render = (item) => {
        return setSlotComponents(pageSate[res.slotName], item)
      }
    }
    return res
  })
}

type useFormDataConfig = {
  rows?: ObjectMap
  rowSlots?: ObjectMap
  valueOtherData?: ObjectMap
}
export function useFormData(
  item = {},
  config: useFormDataConfig = {}
): {
  value: ObjectMap
  setValue: (item: any) => void
  valueData: { value: ObjectMap }
  rowList: any[]
  valueOtherData: { value: ObjectMap }
} {
  const {
    rows = {},
    rowSlots = {},
    valueOtherData: propsOtherData = {}
  } = config

  const valueData = useRef({ value: item })
  const valueOtherData = useRef({ value: propsOtherData })
  const [value, setValue] = useState(item)
  const handle = (v) => {
    if (!isTrue(v)) {
      valueOtherData.current.value = {}
    }
    valueData.current.value = v
    setValue(v)
  }

  const rowList = useMemo(() => {
    if (isTrue(rows)) {
      const { data = [] } = rows
      return setFormColumnsSlotName(data, rowSlots)
    }
  }, [rows])

  return {
    value,
    setValue: handle,
    valueData: valueData.current,
    rowList,
    valueOtherData: valueOtherData.current
  }
}
