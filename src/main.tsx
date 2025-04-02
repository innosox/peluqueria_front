
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthProvider>
    <App />
    </AuthProvider>
);