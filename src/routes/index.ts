import layout from '@/layout'
import TestForm from '@/view/testForm'
import TestFormList from '@/view/testFormList'
import TestFormAddFormList from '@/view/testFormAddFormList'
import TestFormTable from '@/view/testFormTable'
const routes: any = [
  {
    path: '/',
    component: layout,
    children: [
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
