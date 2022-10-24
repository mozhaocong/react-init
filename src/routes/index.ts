import layout from '@/layout'
import TestForm from '@/view/testForm'
import TestFormList from '@/view/testFormList'
import TestFormAddFormList from '@/view/testFormAddFormList'
import TestFormTable from '@/view/testFormTable'
import Modal from '@/view/modal'
import searchTable from '@/view/searchTable'
import Page from '@/view/page'
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
        component: Modal
      },
      {
        path: 'testForm',
        component: TestForm
      },
      {
        path: 'testFormAddFormList',
        component: TestFormAddFormList
      },
      {
        path: 'testFormList',
        component: TestFormList
      },
      {
        path: 'testFormTable',
        component: TestFormTable
      },
      {
        path: 'page',
        component: Page
      }
    ]
  }
]
export default routes
