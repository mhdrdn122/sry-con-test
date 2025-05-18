// main.jsx أو index.jsx
import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme.jsx';

function AppWrapper() {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');
  const themeApp = useMemo(() => theme(mode), [mode]);
const toggleMode=() => {
  localStorage.setItem('mode', mode === "light" ? "dark" : "light")
  setMode(prev => prev === "light" ? "dark" : "light")}
  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={themeApp}>
              <CssBaseline />
              <App  toggleMode={toggleMode} />
            </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<AppWrapper />);
