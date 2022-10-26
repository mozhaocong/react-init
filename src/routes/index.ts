import layout from '@/layout'
import testForm from '@/view/testForm'
import testFormList from '@/view/testFormList'
import testFormAddFormList from '@/view/testFormAddFormList'
import testFormTable from '@/view/testFormTable'
import testModal from '@/view/testModal'
import pageSearchTable from '@/view/pageSearchTable'
import pageDetails from '@/view/pageDetails'
import testFormSelect from '@/view/testFormSelect'
import pageCreate from '@/view/pageCreate'
import pageSplitOrder from '@/view/pageSplitOrder'
import componentsPage from '@/view/componentsPage'
import testReducer from '@/view/testReducer'
import testFormBasicData from '@/view/testFormBasicData'

const routes: any = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: 'pageSearchTable',
        component: pageSearchTable
      },
      {
        path: 'testModal',
        component: testModal
      },
      {
        path: 'testForm',
        component: testForm
      },
      {
        path: 'testFormAddFormList',
        component: testFormAddFormList
      },
      {
        path: 'testFormList',
        component: testFormList
      },
      {
        path: 'testFormTable',
        component: testFormTable
      },
      {
        path: 'pageDetails',
        component: pageDetails
      },
      {
        path: 'pageCreate',
        component: pageCreate
      },
      {
        path: 'testFormSelect',
        component: testFormSelect
      },
      {
        path: 'pageSplitOrder',
        component: pageSplitOrder
      },
      {
        path: 'componentsPage',
        component: componentsPage
      },
      {
        path: 'formBasicData',
        component: testFormBasicData
      },
      {
        path: 'testReducer',
        component: testReducer
      }
    ]
  }
]
export default routes
