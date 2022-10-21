import React from 'react'
import { Button } from 'antd'
import { createModal } from '@/components'
export default () => {
  function showModal() {
    console.log('123456')
    const data = createModal({ content: <div>123</div> })
  }

  return <Button onClick={showModal}>1</Button>
}
