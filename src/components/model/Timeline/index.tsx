import React, { useState } from 'react'
import { TimelineProps } from 'antd/lib/timeline/Timeline'
import { isTrue } from 'html-mzc-tool'
import './index.less'
interface timelineProps extends TimelineProps {
  value?: { title: string; time: string; person: string; content: string }[]
  reverse?: boolean
}

const View = (props: timelineProps) => {
  const data = {
    value: [
      { title: '待确认', person: 'admin', time: '2022-10-30 20:30:30' },
      {
        title: '待审核',
        person: '周嘉敏',
        time: '2022-10-30 20:30:30',
        content: '审核拒绝原因：价格不合理'
      },
      {
        title: '待审核',
        person: '周嘉敏',
        time: '2022-10-30 20:30:30',
        content: '审核拒绝原因：价格不合理'
      }
    ]
  }

  function extendLine(type: boolean) {
    return !!props.reverse === type ? (
      <div className={'extend-line'}>
        <div className={'timeline-line'} />
      </div>
    ) : (
      <></>
    )
  }

  return (
    <div
      className={'timeline-components'}
      style={{
        width: '300px'
      }}
    >
      {extendLine(true)}
      {data.value.map((item, index) => {
        const { title, person, time, content } = item
        return (
          <div className={'timeline-block'} key={index}>
            <div className={`timeline-ico `}>
              <div
                className={`timeline-line-top ${
                  props.reverse ? 'timeline-line-top-reverse' : ''
                }`}
              />
              <div
                className={`ico-block ${!index ? 'current-ico-block' : ''}`}
              />
              <div className={'timeline-line'} />
            </div>
            <div
              className={`timeline-content-area ${
                props.reverse ? 'timeline-content-area-reverse' : ''
              }`}
            >
              <div className={'content-block'}>
                <div className={'content-title-time'}>
                  <span>{title}</span>
                  <span>
                    {person} {time}
                  </span>
                </div>
                {isTrue(content) && <div>{content}</div>}
              </div>
            </div>
          </div>
        )
      })}
      {extendLine(false)}
    </div>
  )
}
export default React.memo(View)
