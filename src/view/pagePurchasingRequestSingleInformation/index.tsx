import React from 'react'
import TableList from './model/tableList'
import Details from './model/details'
import Timeline from '@/components/model/Timeline'
import './index.less'
import { Col, Row } from 'antd'

const View = () => {
  return (
    <div className={'pagePurchasingRequestSingleInformation'}>
      <Row style={{ width: '100vw' }} gutter={[128, 0]}>
        <Col span={8}>
          <div className={'table-area'}>
            <TableList />
          </div>
        </Col>
        <Col span={12}>
          <div className={'details-area'}>
            <Details />
          </div>
        </Col>
        <Col span={4}>
          <div className={'timeline-area'}>
            <Timeline
              reverse={true}
              style={{ width: '100%', height: '100%' }}
              value={[
                {
                  title: '待确认',
                  person: 'admin',
                  time: '2022-10-30 20:30:30'
                },
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
              ]}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default View
