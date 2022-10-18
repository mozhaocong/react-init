import React from 'react'
import { Button, Input } from 'antd'
import { HtForm } from '@/components'
import FormList from '@/components/model/Form/components/formList'
import { useFormData } from '@/components/model/Form/uitls'

class formData {
  data: any
  constructor() {
    this.data = [
      {
        label: 'Username',
        name: 'name',
        component: (configure) => <Input {...configure.publicProps} />
      },
      {
        render(configure) {
          return (
            <FormList
              {...configure}
              columns={[
                {
                  label: 'Price',
                  name: 'Price',
                  component: (item) => {
                    console.log(item)
                    return <Input />
                  }
                },
                {
                  render(item) {
                    return (
                      <Button
                        onClick={() => {
                          item.add()
                        }}
                      >
                        添加
                      </Button>
                    )
                  }
                }
              ]}
              name={'test'}
              isForm={false}
            />
          )
        }
      }
    ]
  }
}

const View = () => {
  const { value, setValue, valueData, rowList } = useFormData(
    {
      name: 'ASGASGA',
      test: [{}]
    },
    { rows: new formData() }
  )

  return (
    <div>
      <div> FormAddFormList</div>
      <HtForm
        columns={rowList}
        value={value}
        onChange={setValue}
        setValue={setValue}
        valueData={valueData}
      />
      <Button
        onClick={() => {
          console.log('value', value)
        }}
      >
        value
      </Button>
    </div>
  )
}

export default View
