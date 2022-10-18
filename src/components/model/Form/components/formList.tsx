import React from 'react'
import { Form } from 'antd'
import RForm from '../index'
import FormItem from './formItem'
import { getFormName } from '../uitls'

const FormList = (props) => {
  const {
    name = '',
    columns = [],
    publicProps = {},
    isForm = true,
    value,
    valueData,
    setValue,
    ...attrs
  } = props

  const config = {
    name,
    render: () => {
      return (
        <Form.List name={name}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={'fields' + index}>
                  {columns.map((res, index) => {
                    const { name, ...resAttrs } = res
                    return (
                      <FormItem
                        {...{
                          ...field,
                          ...resAttrs,
                          key: JSON.stringify(getFormName(field.name, name)),
                          name: getFormName(field.name, name),
                          publicProps: {
                            value,
                            valueData,
                            setValue,
                            res,
                            index,
                            add,
                            remove,
                            field,
                            publicProps
                          }
                        }}
                      />
                    )
                  })}
                </div>
              ))}
            </>
          )}
        </Form.List>
      )
    }
  }

  if (isForm) {
    return <RForm {...{ columns: [{ ...config }], value, ...attrs }} />
  } else {
    return config.render()
  }
}

export default FormList
