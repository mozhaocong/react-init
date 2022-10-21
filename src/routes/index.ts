import layout from '@/layout'
import TestForm from '@/view/testForm'
import TestFormList from '@/view/testFormList'
import TestFormAddFormList from '@/view/testFormAddFormList'
import TestFormTable from '@/view/testFormTable'
import Modal from '@/view/modal'
import Search from '@/view/search'
const routes: any = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: 'search',
        component: Search
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
      }
    ]
  }
]
export default routes
