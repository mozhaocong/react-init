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

  return (
    <div style={{ width: '300px' }}>
      {data.value.map((item) => {
        const { title, person, time, content } = item
        return (
          <div className={'timeline-block'}>
            <div className={`timeline-ico `}>
              <div
                className={`timeline-line-top ${
                  props.reverse ? 'timeline-line-top-reverse' : ''
                }`}
              ></div>
              <div className={'ico-block'}></div>
              <div className={'timeline-line-bottom'}></div>
            </div>
            <div
              className={`timeline-content-area ${
                props.reverse ? 'timeline-content-area-reverse' : ''
              }`}
            >
              <div className={'content-block'}>
                <div>
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
    </div>
  )
}
export default React.memo(View)
