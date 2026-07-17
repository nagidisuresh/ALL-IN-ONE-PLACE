import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import { LanguageProvider } from './components/LanguageProvider.tsx';
import { ToastProvider } from './components/Toast.tsx';
import './index.css';

// Handle and suppress benign HMR WebSocket/Vite errors in the sandbox environment
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    if (reason && (
      (reason.message && reason.message.includes("WebSocket")) ||
      (reason.toString && reason.toString().includes("WebSocket")) ||
      (reason.stack && reason.stack.includes("vite"))
    )) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener("error", (event) => {
    if (event.message && (event.message.includes("WebSocket") || event.message.includes("vite"))) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  // Suppress THREE.Clock deprecation warning to keep dev logs pristine
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === 'string' && (args[0].includes('THREE.Clock') || args[0].includes('THREE.Timer'))) {
      return;
    }
    originalWarn(...args);
  };
}

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

