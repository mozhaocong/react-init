import React from 'react'
import { isFunctionOfOther } from '@/uitls'
import { Col, Form } from 'antd'

const View = (props) => {
  const {
    extra,
    style,
    name,
    labelAlign,
    label,
    publicProps = {},
    display,
    render,
    component,
    col,
    ...attrs
  } = props

  if (display) {
    if (display(publicProps) === false) {
      return false
    }
  }
  if (render) {
    return render(publicProps)
  }
  if (!component) {
    return false
  }

  return (
    <Col span={col} key={JSON.stringify(name)}>
      <Form.Item
        style={style}
        extra={isFunctionOfOther(extra)}
        labelAlign={labelAlign}
        className="htFromItem"
        name={name}
        label={isFunctionOfOther(label)}
        {...attrs}
      >
        {component(publicProps)}
      </Form.Item>
    </Col>
  )
}

export default View
