import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import { LanguageProvider } from './components/LanguageProvider.tsx';
import { ToastProvider } from './components/Toast.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);

