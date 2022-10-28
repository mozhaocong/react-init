import React, { useMemo, useState } from 'react'
import { Button } from 'antd'
import { formRows, pageSate } from '@/view/testForm/configData'
import { HtForm } from '@/components'
const { useFormData } = HtForm
import { setFormColumnsSlotName } from '@/components/model/Form/uitls'

const App = () => {
  const [form, seForm] = useState()
  const formData = useMemo(() => {
    return new formRows({ formRef: form }).data
  }, [form])

  const { value, setValue, valueData } = useFormData({
    name: 'ASGASGA'
  })

  return (
    <div>
      {/*<HtSelect options={configBusinessDataOptions.integralType} />*/}
      <HtForm
        propsForm={seForm}
        columns={setFormColumnsSlotName(formData, pageSate)}
        value={value}
        onChange={setValue}
        setValue={setValue}
        valueData={valueData}
      />
      <Button
        onClick={() => {
          console.log('value', valueData)
        }}
      >
        value
      </Button>
    </div>
  )
}

export default App
