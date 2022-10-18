import { Form, Row, Spin } from 'antd'
import React, { useEffect, useRef } from 'react'
import { setFormDefValue } from '@/components/model/Form/uitls'
import FormItem from './components/formItem'

const App = (props) => {
  const {
    fId,
    loading,
    columns,
    labelCol = { span: 8 },
    wrapperCol = { span: 8 },
    col = 24,
    labelAlign = 'right',
    style,
    onChange,
    propsForm,
    form: propsFormRef,
    value,
    valueData,
    setValue,
    publicProps = {},
    ...attrs
  } = props
  let [form] = Form.useForm()
  if (propsFormRef) {
    form = propsFormRef
  }
  const isInitialValues = useRef(true)
  const onFinish = (values) => {
    const { handleSubmit } = props
    if (handleSubmit) {
      handleSubmit(values)
    }
  }

  // const onFinishFailed = (errorInfo) => {}
  useEffect(() => {
    if (propsForm) {
      propsForm(form)
    }
  }, [])

  useEffect(() => {
    const data = form.getFieldsValue()

    // form 数据和value保持一致， 所以以value为主
    if (!isInitialValues.current) {
      for (const dataKey in data) {
        data[dataKey] = null
      }
    }

    form.setFieldsValue({ ...data, ...value } || {})
    // initialValues 第一次时 把数据传回value
    if (isInitialValues.current) {
      onChange({ ...data, ...value })
    }
    isInitialValues.current = false
  }, [value])

  return (
    <div style={style}>
      <Spin spinning={loading ?? false}>
        <Form
          {...{ labelCol, wrapperCol, ...attrs }}
          form={form}
          id={fId || 'fromID'}
          onFinish={onFinish}
          autoComplete="off"
          onValuesChange={() => {
            if (onChange) {
              onChange(form.getFieldsValue())
            }
            if (propsForm) {
              propsForm(form)
            }
          }}
        >
          <Row style={{ margin: 0 }}>
            {columns.map((item, index) => {
              const {
                labelAlign: itemLabelAlign,
                col: itemCol,
                name,
                ...columnAttrs
              } = item
              return (
                <FormItem
                  key={'FormItem' + JSON.stringify(name ?? index)}
                  {...{
                    labelAlign: itemLabelAlign ?? labelAlign,
                    col: itemCol ?? col,
                    name,
                    publicProps: {
                      value,
                      valueData,
                      setValue,
                      publicProps
                    },
                    ...columnAttrs
                  }}
                />
              )
            })}
          </Row>
        </Form>
      </Spin>
    </div>
  )
}

export { App as default }
App.setFormDefValue = setFormDefValue
