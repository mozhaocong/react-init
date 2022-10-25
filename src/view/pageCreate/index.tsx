import React from 'react'
import {
  baseFormColumnsItem,
  baseFormTableColumnsItem
} from '@/components/model/Form/indexType'
import { HtForm } from '@/components'
import { Button, Input } from 'antd'
import { useFormData } from '@/components/model/Form/uitls'
import { deepClone } from 'html-mzc-tool'
const { ShowText, FormTable } = HtForm

const Xuhao = (props) => {
  return <div>{props.index + 1}</div>
}

class formTable extends baseFormTableColumnsItem {
  constructor() {
    super()
    this.setColumns([
      { title: '序号', render: (item) => <Xuhao {...item} /> },
      { dataIndex: 'a2', title: 'SKU图片', render: () => <Input /> },
      { dataIndex: 'a3', title: 'SKU', render: () => <Input /> },
      { dataIndex: 'a4', title: '采购数', render: () => <Input /> },
      { dataIndex: 'a4', title: '变体属性', render: () => <Input /> },
      { dataIndex: 'a4', title: '采购数', render: () => <Input /> },
      {
        title: '操作',
        render: (item) => {
          const { value, index, setValue } = item
          const cloneData = deepClone(value)
          const data = value.test || []
          return (
            <>
              <Button
                onClick={() => {
                  cloneData.test.splice(index, 1)
                  setValue(cloneData)
                }}
              >
                删除
              </Button>
              {data.length === index + 1 && (
                <Button
                  onClick={() => {
                    cloneData.test.push({})
                    console.log(cloneData)
                    setValue(cloneData)
                  }}
                >
                  添加行
                </Button>
              )}
            </>
          )
        }
      }
    ])
  }
}
class form extends baseFormColumnsItem {
  constructor() {
    super()
    this.setColumns([
      { name: 'c1', label: 'spu', component: () => <Input /> },
      { name: 'c2', label: '所属品牌', component: () => <Input /> },
      { name: 'c3', label: '送货仓库', component: () => <Input /> },
      { name: 'c4', label: '送货仓库', component: () => <Input /> },
      { name: 'c5', label: '业务约定交期', component: () => <Input /> },
      { name: 'c6', label: '特殊标记', component: () => <Input /> },
      { name: 'c7', label: '采购单备注', component: () => <Input /> },
      {
        render: (config) => {
          return (
            <FormTable
              {...config}
              columns={new formTable().data}
              formName="test"
              isForm={false}
            />
          )
        }
      }
    ])
  }
}

const View = () => {
  const { value, setValue, ...attrs } = useFormData({
    c1: '1',
    test: [{ a2: 1 }, { a2: 2 }]
  })
  return (
    <div>
      <div>pageCreate</div>
      <HtForm
        {...attrs}
        value={value}
        setValue={setValue}
        onChange={setValue}
        columns={new form().data}
      />
      <Button
        onClick={() => {
          console.log(value)
        }}
      >
        查看
      </Button>
    </div>
  )
}
export default View