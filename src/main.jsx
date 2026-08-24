import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#222', color: '#ff5555', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>Algo salió mal en tiempo de ejecución:</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.warn("Falta la VITE_CLERK_PUBLISHABLE_KEY en el archivo .env");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ErrorBoundary><App /></ErrorBoundary>
      </ClerkProvider>
    ) : (
      <div className="min-h-screen bg-vault-950 flex items-center justify-center p-4">
        <div className="bg-vault-900 border border-amber-500/30 p-6 rounded-2xl max-w-md text-center">
          <h2 className="text-xl font-bold text-amber-400 mb-2">Falta Configuración de Clerk</h2>
          <p className="text-slate-300 text-sm">
            Por favor, añade tu <strong>VITE_CLERK_PUBLISHABLE_KEY</strong> al archivo .env.local y reinicia el servidor.
          </p>
        </div>
      </div>
    )}
  </React.StrictMode>,
);

