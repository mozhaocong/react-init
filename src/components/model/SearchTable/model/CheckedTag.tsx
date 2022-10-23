import React, { Fragment, useMemo } from 'react'
import { deepClone, isString, isTrue } from 'html-mzc-tool'
import { Tag } from 'antd'
import {
  getFormValueFromName,
  setNameToValue
} from '@/components/model/Form/uitls'

export type listSearchType = {
  value: ObjectMap
  columns: columnType[]
  setItemList?: {
    name: any
    setChecked?: (item: tagItemType) => React.ReactElement
    [index: string]: any
  }[]
  valueOtherData?: { value: ObjectMap }
}

type columnType = { label: string; name: string }
type tagItemType = Omit<listSearchType, 'columns'> &
  columnType & { onSearch: (item) => void; nameData: any }

const CheckedTag = (props: {
  listSearch: listSearchType[]
  onSearch: (item: ObjectMap) => void
}) => {
  const { listSearch, onSearch } = props
  const listTag = useMemo(() => {
    const data = []
    listSearch.forEach((item) => {
      const { value, columns, ...attrs } = item
      if (!isTrue(value)) return
      columns.forEach((res) => {
        const nameData = getFormValueFromName(value, res.name)
        if (isTrue(nameData)) {
          data.push(deepClone({ ...res, ...attrs, value, nameData }))
        }
      })
    })
    return data
  }, [listSearch])
  if (!isTrue(listTag)) return <></>

  function closeTag(e: any, item: tagItemType | { [index: string]: any }) {
    e.preventDefault()
    const { value, name } = item
    const data = setNameToValue(value, name, () => undefined)
    onSearch(data)
  }
  function getTag(item: tagItemType) {
    const { label, name, setItemList, nameData } = item
    console.log('getTag', item)
    if (!(isString(nameData) && isTrue(label))) {
      if (isTrue(setItemList)) {
        return (
          setItemList
            .filter((res) => name == res.name && isTrue(res.setChecked))
            .map((res) => res.setChecked)?.[0]?.(item) || []
        )
      }
      return <></>
    }
    return (
      <Tag closable onClose={(e) => closeTag(e, item)}>
        {label}: {nameData}
      </Tag>
    )
  }

  return (
    <div>
      {listTag.map((item, index) => {
        return <Fragment key={index}>{getTag(item)}</Fragment>
      })}
    </div>
  )
}

export default CheckedTag