import React, { useMemo, useState } from 'react'
import { Button } from 'antd'
import { formRows, pageSate } from '@/view/testForm/configData'
import { HtForm } from '@/components'
import { useFormData } from '@/components/model/Form/uitls'

const App = () => {
  const [form, seForm] = useState()
  const formData = useMemo(() => {
    return new formRows({ formRef: form })
  }, [form])

  const { value, setValue, valueData, rowList } = useFormData(
    {
      name: 'ASGASGA'
    },
    { rows: formData, rowSlots: pageSate }
  )

  return (
    <div>
      {/*<HtSelect options={configBusinessDataOptions.integralType} />*/}
      <HtForm
        propsForm={seForm}
        columns={rowList}
        value={value}
        onChange={setValue}
        setValue={setValue}
        valueData={valueData}
      />
      <Button
        onClick={() => {
          // setValue({ name: 456 })
          console.log('value', valueData)
        }}
      >
        value
      </Button>
    </div>
  )
}

export default App
