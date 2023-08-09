import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux'; // <-- Import the Provider
import { store } from './app/store';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { PropertyProvider } from './context/PropertyContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <Provider store={store}> 
      <PropertyProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
        </PropertyProvider>
      </Provider>
    </HelmetProvider>
  );
}
