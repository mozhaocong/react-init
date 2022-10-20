import { _FormType } from '@/components/model/Form/indexType'
import { HtForm } from '@/components'
import { Button } from 'antd'
import React from 'react'

const Search = (props: _FormType & { onReset: () => void }) => {
  const { value, onReset, columns, ...attrs } = props
  function onResetClick() {
    onReset()
  }

  return (
    <div>
      <HtForm {...{ value, columns, ...attrs }} />
      <div>
        <Button loading={attrs.loading} htmlType={'submit'} form={attrs.fId}>
          搜索
        </Button>
        <Button loading={attrs.loading} onClick={onResetClick}>
          重置
        </Button>
      </div>
    </div>
  )
}

export default Search
