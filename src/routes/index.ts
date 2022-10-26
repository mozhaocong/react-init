import layout from '@/layout'
import testForm from '@/view/testForm'
import testFormList from '@/view/testFormList'
import testFormAddFormList from '@/view/testFormAddFormList'
import testFormTable from '@/view/testFormTable'
import modal from '@/view/modal'
import searchTable from '@/view/searchTable'
import pageDetails from '@/view/pageDetails'
import formSelect from '@/view/formSelect'
import pageCreate from '@/view/pageCreate'
import pageSplitOrder from '@/view/pageSplitOrder'
import componentsPage from '@/view/componentsPage'
import testReducer from '@/view/testReducer'
import formBasicData from '@/view/formBasicData'

const routes: any = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: 'searchTable',
        component: searchTable
      },
      {
        path: 'modal',
        component: modal
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
        path: 'formSelect',
        component: formSelect
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
        component: formBasicData
      },
      {
        path: 'testReducer',
        component: testReducer
      }
    ]
  }
]
export default routes
