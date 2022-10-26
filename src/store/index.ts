import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counterSlice'
import businessSlice from '@/store/features/business'

export default configureStore({
  reducer: {
    counter: counterSlice,
    business: businessSlice
  }
})
