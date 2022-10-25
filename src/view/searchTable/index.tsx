import { baseFormColumnsItem } from '@/components/model/Form/indexType'
import React from 'react'
import { axiosGet, deepClone, isTrue } from 'html-mzc-tool'
import { Input, DatePicker } from 'antd'
import { SearchTable } from '@/components'
import { setFormColumnsSlotName } from '@/components/model/Form/uitls'
import { baseSetChecked } from '@/components/model/SearchTable/model/CheckedTag'
const { RangePicker } = DatePicker
import dayjs from 'dayjs'
import moment from 'moment'

function orders(data = {}) {
  return axiosGet('http://crm_test.htwig.com/order/api/orders', data)
}

class searchColumn extends baseFormColumnsItem {
  constructor() {
    super()
    this.setColumns([
      {
        label: '编号检索',
        name: 'no',
        component: () => <Input />
      },
      { label: '客户检索', name: 'customer_name', component: () => <Input /> },
      { label: '运单号', name: 'shipping_no', component: () => <Input /> },
      { label: '订单类型', name: 'type', component: () => <Input /> },
      { label: '发货方式', name: 'delivery_type', component: () => <Input /> },
      { slotName: 'spPlatform', name: 'spPlatformSelect' },
      { slotName: 'rangePicker', name: 'rangePicker' }
    ])
  }
}

export const pageSate = {
  // 组件列表slot name
  spPlatform: {
    selectNane: 'spPlatformSelect', // form表单的Name
    optionNane: 'spPlatformOption',
    initialValue: {
      select: 'sellerSku'
    },
    placeholder: 'Select province',
    slotType: 'selectOption', // 组件模式
    component: () => {
      return <Input />
    },
    slotList: [
      { label: '创建人', key: 'sku' },
      { label: '销售负责人', key: 'sellerSku' }
    ]
  },
  rangePicker: {
    selectNane: ['rangePicker', 'type'], // form表单的Name
    optionNane: ['rangePicker', 'value'],
    initialValue: {
      select: 'createTime'
    },
    placeholder: 'Select province',
    slotType: 'selectOption', // 组件模式
    component: (item) => {
      console.log('item', item)
      return (
        <RangePicker
          format="YYYY-MM-DD"
          onChange={(value) => {
            console.log(value)
          }}
        />
      )
    },
    slotList: [
      { label: '创建时间', key: 'createTime' },
      { label: '更新时间', key: 'updateTime' }
    ]
  }
}

const tableColumns = [
  {
    title: '订单信息',
    dataIndex: 'no'
  },
  {
    title: '产品信息',
    dataIndex: 'category_name'
  },
  {
    title: '费用信息',
    dataIndex: 'total_price'
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at'
  },
  {
    title: '日期',
    dataIndex: 'plat_created_time'
  }
]

const View = () => {
  return (
    <SearchTable
      search={{
        fId: 'searchTest',
        columns: setFormColumnsSlotName(new searchColumn().data, pageSate),
        slotList: pageSate,
        setItemList: [
          {
            name: 'spPlatformSelect',
            setChecked(item: any) {
              return baseSetChecked({
                item: item,
                label: 'spPlatformSelectLabel',
                text: 'spPlatformOption',
                closeName: 'spPlatformOption'
              })
            }
            // setSearchData(item, nameData) {
            //   item = deepClone(item)
            //   const { option, select } = nameData
            //   if (isTrue(option)) {
            //     item.option = option
            //     item.select = select
            //   }
            //   delete item.spPlatform
            //   return item
            // }
          },
          {
            name: 'rangePicker',
            setChecked(item: any) {
              return baseSetChecked({
                item: item,
                label: 'typeLabel',
                setOption(item, nameData) {
                  const data =
                    nameData?.value?.map((res) => {
                      return moment(res).format('YYYY-MM-DD')
                    }) || []
                  return data.join(',')
                },
                closeName: ['rangePicker', 'value'],
                propsName: 'rangePicker'
              })
            },
            setSearchData(item, nameData) {
              const data =
                nameData.value?.map((res) => {
                  return moment(res).format('YYYY-MM-DD')
                }) || []
              item.rangePickerType = nameData.type
              item.rangePickerData = data.join(',')
              delete item.rangePicker
              return item
            }
          }
        ]
      }}
      table={{ columns: tableColumns, rowKey: 'no' }}
      useRequest={{
        defaultParams: { is_simple: 0 },
        apiRequest: orders,
        onSuccess(item, res) {
          console.log(item, res)
          return item?.data?.data
        }
      }}
    />
  )
}

export default View
