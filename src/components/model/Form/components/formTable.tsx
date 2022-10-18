import React, { useEffect, useMemo, useState } from 'react'
import { isArray, isFunctionOfOther, isTrue } from 'html-mzc-tool'
import FormItem from './formItem'
import { Table } from 'antd'
import { getFormName, getFormValueFromName } from '../uitls'
import RForm from '../index'
import { _FormTableType } from '../indexType'

const _FormTable = (props: _FormTableType) => {
  const { value, columns, name, rowKey, isForm = true, ...attrs } = props
  const [data, setData] = useState([])
  const [formValue, setFormValue] = useState([])
  useEffect(() => {
    const formData = getFormValueFromName(value, name)
    if (isArray(formData) && formValue.length !== formData.length) {
      console.log('123456789')
      setData(
        formData.map((item: any, index) => {
          item.key = isTrue(rowKey) ? isFunctionOfOther(rowKey, item) : index
          return item
        })
      )
    }
    setFormValue(formData)
  }, [value, name])

  const tableColumns = useMemo(() => {
    return columns.map((item) => {
      const { dataIndex } = item
      if (isTrue(item.render)) {
        const oldRender = item.render
        // @ts-ignore
        item.render = (item, itemB, index) => {
          return (
            <FormItem
              component={() => oldRender(item, itemB, index, value)}
              name={getFormName(name, [index, dataIndex])}
            />
          )
        }
      }
      return item
    })
  }, [columns])

  const config = {
    render() {
      return <Table columns={tableColumns} dataSource={data} />
    }
  }

  return config.render()

  if (isForm) {
    return <RForm {...{ columns: [{ ...config }], value, ...attrs }} />
  } else {
    return config.render()
  }
}

export default _FormTable
