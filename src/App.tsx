import AuthProvider from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import { ToastProvider } from "./context/ToastContext";
import { QueryProvider } from "./lib/QueryProvider";
import AppRouter from "./routes";

function App() {
  return (
    <QueryProvider>
      <ToastProvider>
        <LoadingProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </LoadingProvider>
      </ToastProvider>
    </QueryProvider>
  );
}

export default App;
