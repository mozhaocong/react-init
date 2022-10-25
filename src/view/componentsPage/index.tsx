import React, { useState } from 'react'
import Timeline from '@/components/model/Timeline'
import { Button } from 'antd'
const View = () => {
  const [reverse, setReverse] = useState(false)
  return (
    <div>
      <Timeline reverse={reverse} />
      <Button
        onClick={() => {
          setReverse(!reverse)
        }}
      >
        reverse
      </Button>
    </div>
  )
}
export default View
