import React from 'react'
import { FormProps } from 'antd/lib/form/Form'
import { FormInstance } from 'antd/lib/form/hooks/useForm'
import { GetRowKey } from 'rc-table/lib/interface'
import { FormItemProps } from 'antd/lib/form/FormItem'
import { ColumnType } from 'antd/lib/table/interface'
import { ColProps } from 'antd/lib/grid/col'

export interface _FormType extends FormProps {
  fId?: string //form 的 Id
  loading?: boolean
  columns?: Array<columnsItem<formPublicProps>>
  col?: ColProps // 使用 row col 布局
  style?: ObjectMap
  onChange?: (item: ObjectMap) => void
  propsForm?: (formRef: ObjectMap) => void // form 组件初始化后 把 formRef 回传出去
  form?: FormInstance // Form.useForm() 生成的
  value?: ObjectMap
  valueData?: ObjectMap // value的实时值
  setValue?: (item: any) => void // value valueData setValue 三个参数都是从 useFormData 返回的值
  publicProps?: ObjectMap // 组件公共参数
  valueOtherData?: ObjectMap
}

export interface _FormListType extends _FormType {
  isForm?: boolean // 是否返回带用form 的组件
  columns: Array<columnsItem<formListPublicProps>>
  formName: string | number | Array<string | number>
}

export interface _FormTableType extends Omit<_FormType, 'columns'> {
  rowKey?: string | GetRowKey<unknown>
  isForm?: boolean // 是否返回带用form 的组件
  columns: Array<ColumnTypeForm<formTablePublicProps>>
  formName: string | number | Array<string | number>
}

export interface ColumnTypeForm<T>
  extends Omit<ColumnType<unknown>, 'render'>,
    Pick<FormItemProps, 'rules'> {
  dataIndex?: any
  render?: (item: T) => React.ReactElement
}

interface formPublicProps {
  value: ObjectMap
  valueData: ObjectMap
  setValue: (item: ObjectMap) => void
  publicProps: ObjectMap
}
interface formListPublicProps extends formPublicProps {
  res: ObjectMap // 当前条数据的值
  index: number // 当前数据下标
  add: () => void // 添加一条数据
  remove: (fieldName: ObjectMap) => void // 删除一条数组 传参数是 返回的 field.name
  field: ObjectMap // 组件内容生成的当前数据
}

interface formTablePublicProps extends Omit<formPublicProps, 'formRef'> {
  text: string | ObjectMap
  record: ObjectMap
  index: number
  item: ObjectMap
}

export interface columnsItem<T = ObjectMap> extends FormItemProps {
  publicProps?: T
  display?: (item: T) => boolean
  render?: (item: T, ...attrs: any) => React.ReactElement
  component?: (item: T) => React.ReactElement
  customRender?: (item: T) => React.ReactElement
  col?: ColProps
  style?: ObjectMap
  slotName?: string
}

export class baseFormColumnsItem<T = columnsItem<formPublicProps>> {
  data: Array<T>
  setColumns(item: Array<T>) {
    this.data = item
  }
}

export class baseFormListColumnsItem extends baseFormColumnsItem<
  columnsItem<formListPublicProps>
> {}

export class baseFormTableColumnsItem extends baseFormColumnsItem<
  ColumnTypeForm<formTablePublicProps>
> {}

class testData extends baseFormColumnsItem {
  constructor() {
    super()
    this.setColumns([{ name: 'a', label: '12456' }])
  }
}

// class testDataTable extends baseFormTableColumnsItem {
//   constructor() {
//     super()
//     this.setColumns([
//       {
//         dataIndex: 'name',
//         title: 'name'
//       }
//     ])
//   }
// }

export class baseTableColumns {
  data: ColumnType<any>[]
  setColumns(item: Array<ColumnType<any>>) {
    this.data = item
  }
}
