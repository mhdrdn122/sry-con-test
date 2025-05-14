import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store/store.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import WidthWindowProvider from './Context/WindowWidthContext.jsx'
// import { WindowWidthProvider } from './Context/WindowWidthContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
       <Provider store={store} >
        <WidthWindowProvider>
      <App />
        </WidthWindowProvider>

    </Provider>
 
  </BrowserRouter>
  // {/* </StrictMode>, */}
)
