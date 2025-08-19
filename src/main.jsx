import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom' // ← düzəliş
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { store } from './store/Store.js'
import route from './router/route.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={route} />
  </Provider>
)
