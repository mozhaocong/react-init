import layout from '@/layout'
import TestForm from '@/view/testForm'
import TestFormList from '@/view/testFormList'
import TestFormAddFormList from '@/view/testFormAddFormList'
import TestFormTable from '@/view/testFormTable'
import Modal from '@/view/modal'
import SearchTable from '@/view/searchTable'
import PageDetails from '@/view/pageDetails'
import FormSelect from '@/view/formSelect'
import PageCreate from '@/view/pageCreate'
const routes: any = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: 'searchTable',
        component: SearchTable
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
        path: 'pageDetails',
        component: PageDetails
      },
      {
        path: 'pageCreate',
        component: PageCreate
      },
      {
        path: 'formSelect',
        component: FormSelect
      }
    ]
  }
]
export default routes
