import React from 'react'
import { Button, Input } from 'antd'
import { HtForm } from '@/components'
const { useFormData, FormTable } = HtForm

// function get

const View = () => {
  const { value, setValue } = useFormData({
    test: [{ name: '1' }, { name: '2' }, { name: '3' }]
  })

  const mergedColumns = [
    {
      rules: [{ required: true }],
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      render(item) {
        // console.log(item)
        return <Input />
      }
    }
  ]

  const rowList = [
    {
      render() {
        return (
          <FormTable
            value={value}
            name={'test'}
            columns={mergedColumns}
            isForm={false}
          />
        )
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
        <FormTable
          fId={'formTable'}
          value={value}
          name={'test'}
          columns={mergedColumns}
          onChange={setValue}
          setValue={setValue}
          onFinish={(value) => {
            console.log('onFinish', value)
          }}
        />

        <Button
          htmlType={'submit'}
          form={'formTable'}
          // onClick={() => {
          //   console.log(value)
          // }}
        >
          查看
        </Button>
      </div>
    </div>
  )
}

export default View
