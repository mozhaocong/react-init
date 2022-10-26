import React, { useState } from 'react'
import Timeline from '@/components/model/Timeline'
import { Button, Card, Divider } from 'antd'
import FormBasic from '@/components/model/FormBasic'
import FormSelect from '@/components/model/FormSelect'
const View = () => {
  const [reverse, setReverse] = useState(false)
  return (
    <div>
      <Card title="Timeline">
        <Timeline reverse={reverse} />
        <Button
          onClick={() => {
            setReverse(!reverse)
          }}
        >
          reverse
        </Button>
      </Card>
      <Divider />
      <Card title="FormBasic">
        <FormBasic prop={'basicSysUserList'} />
        <Divider />
        <FormBasic prop={'basicSysUserList'} />
      </Card>
      <Card title="FormSelect">
        <FormSelect prop={'baseStatus'} />
      </Card>
    </div>
  )
}
export default View
