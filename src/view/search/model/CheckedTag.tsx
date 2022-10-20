import React, { Fragment, useMemo } from 'react'
import { deepClone, isString, isTrue } from 'html-mzc-tool'
import { Tag } from 'antd'

type listSearchType = {
  value: ObjectMap
  setValue: (v: any) => void
  columns: columnType[]
  setNameItem?: ObjectMap<string, (item: tagItemType) => React.ReactElement>
  // deleteNameItem?: ObjectMap<
  //   string,
  //   (item: tagItemType | { [index: string]: any }) => void
  // >
}

type columnType = { label: string; name: string }
type tagItemType = Omit<listSearchType, 'columns'> & columnType

const CheckedTag = (props: { listSearch: listSearchType[] }) => {
  const { listSearch } = props
  const listTag = useMemo(() => {
    const data = []
    listSearch.forEach((item) => {
      const { value, columns, setValue, ...attrs } = item
      if (!isTrue(value)) return
      columns.forEach((res) => {
        if (isTrue(value[res.name])) {
          data.push(deepClone({ ...res, ...attrs, value, setValue }))
        }
      })
    })
    return data
  }, [listSearch])
  if (!isTrue(listTag)) return <></>

  function closeTag(e: any, item: tagItemType | { [index: string]: any }) {
    e.preventDefault()
    const { value, setValue, name } = item
    const data = deepClone(value)
    delete data[name]
    setValue(data)
  }
  function getTag(item: tagItemType) {
    const { label, name, value, setNameItem } = item
    if (!isString(value[name]) || (isTrue(setNameItem) && setNameItem[name])) {
      return isTrue(setNameItem) && setNameItem[name] ? (
        setNameItem[name](item)
      ) : (
        <></>
      )
    }
    return (
      <Tag closable onClose={(e) => closeTag(e, item)}>
        {label}: {value[name]}
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
