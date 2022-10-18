import React, { useEffect, useMemo, useState } from 'react'
import { Button, Input, Table } from 'antd'
import { HtForm } from '@/components'
import { isArray, isFunctionOfOther, isTrue } from 'html-mzc-tool'
import FormItem from '@/components/model/Form/components/formItem'
import {
  getFormName,
  getFormValueFromName,
  useFormData
} from '@/components/model/Form/uitls'

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

// function get

const View = () => {
  const { value, setValue } = useFormData({
    test: [{ name: '1' }, { name: '2' }, { name: '3' }]
  })

  const mergedColumns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      render(item, itemB, index, value) {
        console.log(item, itemB, index, value)
        return (
          // @ts-ignore
          <Input />
        )
      }
      // editable: true
    }
  ]

  const rowList = [
    {
      render() {
        return <FormTable value={value} name={'test'} columns={mergedColumns} />
      }
    },
    {
      name: ['test', 0, 'name'],
      title: 'test1',
      component: () => <Input />
    },
    {
      name: ['test', 1, 'name'],
      title: 'test1',
      component: () => <Input />
    }
  ]

  return (
    <div>
      <div>testFormTable</div>
      <div>
        <HtForm
          columns={rowList}
          value={value}
          onChange={setValue}
          setValue={setValue}
        />
        <Button
          onClick={() => {
            console.log(value)
          }}
        >
          查看
        </Button>
      </div>
    </div>
  )
}

export default View
