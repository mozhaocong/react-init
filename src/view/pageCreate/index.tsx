import React from 'react'
import {
  baseFormColumnsItem,
  baseFormTableColumnsItem
} from '@/components/model/Form/indexType'
import { HtForm } from '@/components'
import { Input } from 'antd'
import { useFormData } from '@/components/model/Form/uitls'
const { ShowText, FormTable } = HtForm

class formTable extends baseFormTableColumnsItem {
  constructor() {
    super()
    this.setColumns([
      { dataIndex: 'a1', title: '序号', component: () => <Input /> },
      { dataIndex: 'a2', title: 'SKU图片', component: () => <Input /> },
      { dataIndex: 'a3', title: 'SKU', component: () => <Input /> }
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
    test: [{ a1: 1 }, { a1: 2 }]
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
    </div>
  )
}
export default View
