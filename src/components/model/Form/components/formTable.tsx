import React, { useEffect, useMemo, useState } from 'react'
import { isArray, isFunctionOfOther, isTrue } from '@ht/html-tool'
import FormItem from './formItem'
import { Table } from 'antd'
import { getFormName, getFormValueFromName } from '../uitls'

const FormTable = (props) => {
  const { value, columns, name, rowKey } = props
  const [data, setData] = useState([])
  const [formValue, setFormValue] = useState([])
  useEffect(() => {
    const formData = getFormValueFromName(value, name)
    if (isArray(formData) && formValue.length !== formData.length) {
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

  return <Table columns={tableColumns} dataSource={data} />
}

export default FormTable
