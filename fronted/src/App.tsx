
import { RouterProvider } from 'react-router';
import router from './routes/Routes';
import './App.css';
import { Provider } from 'react-redux';
import store from './app/store';


import { ThemeProvider, CssBaseline } from '@mui/material';
import customTheme from './pages/custmTheme'; 

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default function AppWithProvider() {
  return (
    <Provider store={store}> 
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  );
}