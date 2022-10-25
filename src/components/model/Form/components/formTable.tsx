import React, { useEffect, useMemo, useState } from 'react'
import { isArray, isFunctionOfOther, isTrue } from 'html-mzc-tool'
import FormItem from './formItem'
import { Table } from 'antd'
import { getFormName, getFormValueFromName } from '../uitls/tool'
import RForm from '../index'
import { _FormTableType } from '../indexType'

const _FormTable = (props: _FormTableType) => {
  const { value, columns, formName, rowKey, isForm = true, ...attrs } = props
  const [data, setData] = useState([])
  const [formValue, setFormValue] = useState([])
  useEffect(() => {
    const formData = getFormValueFromName(value, formName)
    if (isArray(formData) && formValue.length !== formData.length) {
      setData(
        formData.map((item: any, index) => {
          item.key = isTrue(rowKey) ? isFunctionOfOther(rowKey, item) : index
          return item
        })
      )
    }
    setFormValue(formData)
  }, [value, formName])

  const tableColumns = useMemo(() => {
    const { valueData, setValue, publicProps, valueOtherData } = attrs
    return columns.map((item) => {
      const { dataIndex } = item
      if (isTrue(item.render) || isTrue(item.component)) {
        let oldRender: any
        if (isTrue(item.render)) {
          oldRender = item.render
        } else if (isTrue(item.component)) {
          oldRender = item.component
        }
        // @ts-ignore
        item.render = (text, record, index) => {
          const formValueData = getFormValueFromName(value, formName)
          console.log('formValueData', formValueData, value, formName)
          const renderProps = {
            text: getFormValueFromName(formValueData[index], dataIndex),
            record: formValueData[index],
            index,
            item,
            value,
            valueData,
            valueOtherData,
            setValue,
            publicProps
          }

          if (isTrue(item.render)) {
            return oldRender(renderProps)
          } else if (isTrue(item.component)) {
            return (
              <FormItem
                col={{ span: 24 }}
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                component={() => oldRender(renderProps)}
                name={getFormName(formName, [index, dataIndex])}
                rules={item.rules}
              />
            )
          }
        }
      }
      return item
    })
  }, [columns])

  const config = {
    render() {
      return (
        <Table columns={tableColumns} dataSource={data} pagination={false} />
      )
    }
  }

  if (isForm) {
    return <RForm {...{ columns: [{ ...config }], value, ...attrs }} />
  } else {
    return config.render()
  }
}

export default _FormTable
