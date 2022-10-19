import {
  FormBasicData,
  RRangePicker,
  FormConfig,
  MinMaxInput
} from '@/components'
import router from '@/router'
import dayjs from 'dayjs'
import { searchDefRow } from '@/config'
import { Button } from 'ant-design-vue'

export class SearchRow {
  data: FormRowArray
  constructor(searchForm?: any) {
    this.data = [
      {
        title: '编号检索',
        key: 'no',
        props: {
          placeholder: '请输入'
        }
      },
      {
        title: '客户检索',
        key: 'customer_name',
        props: {
          placeholder: '请输入'
        }
      },
      {
        title: '运单号',
        key: 'shipping_no',
        props: {
          placeholder: '请输入'
        }
      },
      {
        title: '订单渠道',
        key: 'category',
        component: <FormBasicData />,
        props: {
          prop: 'basicCategoryList',
          placeholder: '请选择',
          showSearch: true
        }
      },
      {
        title: '订单类型',
        key: 'type',
        props: {
          placeholder: '请输入'
        }
      },
      {
        title: '发货方式',
        key: 'delivery_type',
        props: {
          placeholder: '请输入'
        }
      },
      {
        title: '发货仓库',
        key: 'delivery_repo_name',
        props: {
          placeholder: '请输入'
        }
      },
      {
        title: '订单状态',
        key: 'status',
        component: <FormConfig />,
        props: {
          prop: 'orderStatus',
          placeholder: '请选择',
          showSearch: true
        }
      },
      {
        title: '物流商',
        key: 'shipper_name',
        props: {
          placeholder: '请输入'
        }
      },
      {
        title: '派送方式',
        key: 'shipper_method_name',
        props: {
          placeholder: '请输入'
        }
      },
      {
        title: '国家',
        key: 'country_name',
        props: {
          placeholder: '请输入'
        }
      },
      {
        title: '审核时间',
        key: 'start_audit_time',
        component: <RRangePicker />,
        props: {
          placeholder: ['审核开始时间', '审核结束时间']
        },
        keys: [
          ['start_audit_time', 'startTime'],
          ['end_audit_time', 'endTime']
        ]
      },
      {
        title: '发货时间',
        key: 'start_deliveried_time',
        component: <RRangePicker />,
        props: {
          placeholder: ['发货开始时间', '发货结束时间']
        },
        keys: [
          ['start_deliveried_time', 'startTime'],
          ['end_deliveried_time', 'endTime']
        ]
      },
      {
        title: '订单金额',
        key: 'total_price_min',
        component: <MinMaxInput />,
        // props: {
        // 	placeholder: ['最大值', '最小值'],
        // },
        keys: [
          ['total_price_min', 'minValue'],
          ['total_price_max', 'maxValue']
        ]
      },
      ...searchDefRow,
      {
        title: '参考单号',
        key: 'reference_no',
        props: {
          placeholder: '请输入'
        }
      }
    ]
  }
}

export class TableRow {
  data: tableColumnsType
  constructor(operationConfig?: any) {
    this.data = [
      // {
      // 	title: '',
      // 	dataIndex: '',
      // },
      {
        title: '订单信息',
        key: 'no',
        customRender: ({ text, record }) => {
          return (
            <div>
              <div>订单编号：{text.no}</div>
              <div>参考单号：{text.reference_no}</div>
              <div>订单渠道：{text.category_name}</div>
              <div>客户姓名：{text.customer_name}</div>
              <div>客户邮箱：{text.email}</div>
              <div>参考单号：{text.reference_no}</div>
            </div>
          )
        }
      },
      {
        title: '产品信息',
        key: 'order_items',
        customRender: ({ text, record }) => {
          return (
            <div>
              {text.order_items?.map((item: any) => {
                return (
                  <>
                    <div>SKU: {item.plat_sku_code}</div>
                    <div>数量: {item.num}</div>
                    <div>单价: {item.price}</div>
                  </>
                )
              })}
            </div>
          )
        }
      },
      {
        title: '费用信息',
        key: 'total_price',
        customRender: ({ text, record }) => {
          return (
            <div>
              <div>应付金额: {record.total_price}</div>
              <div>到账金额: {record.total_money}</div>
              {/* <div>预估利润: {record.total_real_profit}</div> */}
            </div>
          )
        }
      },
      {
        title: '物流信息',
        key: 'out_repo_orders',
        customRender: ({ text, record }) => {
          return (
            <div>
              {text.out_repo_orders?.map((item: any) => {
                return (
                  <>
                    {/* <div>物流商: {item.shipper_name}</div> */}
                    <div>派送方式: {item.shipper_method_name}</div>
                    <div>运单号: {item.shipping_no}</div>
                  </>
                )
              })}
            </div>
          )
        }
      },
      {
        title: '日期',
        key: 'plat_created_time',
        customRender: ({ text, record }) => {
          return (
            <div>
              <div>平台创建时间: {text.plat_created_time}</div>
              <div>系统创建时间: {text.created_at}</div>
              {record.out_repo_orders?.map((item: any) => {
                return (
                  <>
                    <div>审核人: {item.audit_user_name}</div>
                    <div>审核时间: {item.audit_time}</div>
                    <div>发货仓库: {item.delivery_repo_name}</div>
                    <div>发货时间: {item.created_at}</div>
                  </>
                )
              })}
            </div>
          )
        }
      },
      {
        title: '操作',
        width: 120,
        key: 'operation',
        customRender: ({ record }) => {
          return (
            <div>
              <Button
                type="primary"
                onClick={() => {
                  operationConfig.setModuleData({
                    record: record
                  })
                }}
              >
                查看
              </Button>
            </div>
          )
        }
      }
    ]
  }
}
