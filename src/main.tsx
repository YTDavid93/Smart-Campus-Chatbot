import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { Toast } from "./utils/Toast.tsx";

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <App />
      <Toast />
    </AuthProvider>
);
